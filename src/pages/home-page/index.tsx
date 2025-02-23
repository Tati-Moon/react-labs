import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Pagination from '../../components/home-page/pagination';
import { ITEMS_PER_PAGE } from '../../consts/constants';
import logoIcon from '../../assets/icons/logo.png';
import Search from '../../components/home-page/search';
import ThemeToggle from '../../components/shared/themeToggle';
import { ThemeContext } from '../../context/themeContext';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useFetchAllQuery } from '../../services/PeopleService';
import { RootState } from '../../store/store';
import Flyout from '../../components/home-page/flyout';
import CardList from '../../components/home-page/card-list';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState(
    localStorage.getItem('searchItem') ?? ''
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const isLight = theme === 'light';

  const { data, error, isLoading } = useFetchAllQuery({
    search: searchItem,
    page: currentPage,
  });

  const results = data?.results || [];
  const totalPages = data ? Math.ceil(data.count / ITEMS_PER_PAGE) : 0;

  const selectedPeoples = useSelector(
    (state: RootState) => state.selectedPeoples.selected
  );
  const selectedCount = Object.values(selectedPeoples).filter(Boolean).length;

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    updateUrl(1, null);
    setSearchItem(term);
    localStorage.setItem('searchItem', term);
  };

  const handlePageChange = (page: number) => {
    updateUrl(page, null);
    setCurrentPage(page);
  };

  const handleItemClick = (id: string) => {
    updateUrl(currentPage, id);
  };

  const handleCloseDetails = () => {
    updateUrl(currentPage, null);
  };

  const handleLeftSectionClick = () => {
    if (showDetails) {
      handleCloseDetails();
    }
  };

  const updateUrl = (page: number, detailsId: string | null) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('frontpage', page.toString());

    let newPath;
    if (detailsId) {
      newPath = `/home/details/${detailsId}`;
    } else {
      newPath = '/home';
    }

    navigate(`${newPath}?${searchParams.toString()}`);
  };

  const showDetails = location.pathname.includes('details');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('frontpage') ?? '1', 10);

    if (totalPages && (page < 1 || page > totalPages)) {
      navigate('/not-found', { replace: true });
    } else {
      setCurrentPage(page);
    }
  }, [totalPages, navigate, location.search]);

  return (
    <>
      <div
        className={classNames(styles.topMenu, {
          [styles.topMenu_light]: isLight,
        })}
      >
        <div className={styles.logo}>
          <img src={logoIcon} alt="logo" className={styles.logoIcon} />
        </div>
        <div className={styles.toggle}>
          <div className={styles.themeToggle}>
            <ThemeToggle />
          </div>
        </div>
        <Search onSearch={handleSearch} />
      </div>
      <h1>Star Wars Character Search</h1>

      <div className={styles.homePage}>
        <div className={styles.leftSection} onClick={handleLeftSectionClick}>
          <CardList
            results={results}
            loading={isLoading}
            error={error ? 'Failed to fetch data.' : null}
            onItemClick={handleItemClick}
            selectedPeoples={selectedPeoples}
          />
          {!isLoading && results.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {showDetails && (
          <div className={styles.rightSection}>
            <Outlet context={{ handleCloseDetails }} />
          </div>
        )}
      </div>

      {selectedCount > 0 && <Flyout selectedCount={selectedCount} />}
    </>
  );
};

export default HomePage;
