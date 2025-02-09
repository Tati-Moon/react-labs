import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Pagination from '../../components/home-page/pagination';
import { ITEMS_PER_PAGE } from '../../consts/constants';
import './index.scss';
import { PEOPLE_ENDPOINT } from '../../consts/urls';

import logoIcon from '../../assets/icons/logo.png';
import { CharacterDetails } from '../../interfaces/characterDetails';
import Search from '../../components/home-page/search';
import CardList from '../../components/pages/home-page/card-list';

const HomePage: React.FC = () => {
  const [results, setResults] = useState<Array<CharacterDetails>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState(
    localStorage.getItem('searchItem') ?? ''
  );
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async (searchItem: string = '') => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${PEOPLE_ENDPOINT}?search=${searchItem}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      } catch (error) {
        setError(`Failed to fetch data. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData(searchItem);
  }, [currentPage, searchItem]);

  const handleSearch = (term: string) => {
    setTotalPages(0);
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
      <div className="top-menu">
        <div className="logo">
          <img src={logoIcon} alt="logo" className="logoIcon" />
        </div>
        <div className="search-container">
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <h1>Star Wars Character Search</h1>

      <div className="home-page">
        <div className="left-section" onClick={handleLeftSectionClick}>
          <CardList
            results={results}
            loading={loading}
            error={error}
            onItemClick={handleItemClick}
          />
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {showDetails && (
          <div className="right-section">
            <Outlet context={{ handleCloseDetails }} /> {}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
