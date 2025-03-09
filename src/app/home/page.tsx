'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import React, { Suspense, useState, useEffect, useContext } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ITEMS_PER_PAGE } from '../../consts/constants';
import { ThemeContext } from '../../context/themeContext';
import Pagination from '../../components/home-page/pagination';
import Search from '../../components/home-page/search';
import ThemeToggle from '../../components/shared/themeToggle';
import { useFetchAllQuery } from '../../services/PeopleService';
import { RootState } from '../../store/store';
import Flyout from '../../components/home-page/flyout';
import CardList from '../../components/home-page/card-list';
import Details from '../../components/home-page/details';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    const storedSearchItem = localStorage.getItem('searchItem');
    if (storedSearchItem) {
      setSearchItem(storedSearchItem);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const pageParam = searchParams.get('frontpage');
      const page = pageParam ? parseInt(pageParam, 10) : 1;

      if (totalPages && (page < 1 || page > totalPages)) {
        router.push('/not-found');
      } else {
        setCurrentPage(page);
      }
    }
  }, [data, totalPages, searchParams, router]);

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    router.push(`${pathname}?frontpage=1`);
    setSearchItem(term);
    localStorage.setItem('searchItem', term);
  };

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?frontpage=${page}`);
    setCurrentPage(page);
  };

  const handleItemClick = (id: string) => {
    router.push(`${pathname}?frontpage=${currentPage}&id=${id}`);
  };

  const showDetails = Boolean(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={classNames(styles.topMenu, {
          [styles.topMenu_light]: isLight,
        })}
      >
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/icons/logo.png"
              width="30"
              height="30"
              alt="logo"
              priority
              className={styles.logoIcon}
            />
          </Link>
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
        <div className={styles.leftSection}>
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
            <Details id={id} />
          </div>
        )}
      </div>

      {selectedCount > 0 && <Flyout selectedCount={selectedCount} />}
    </Suspense>
  );
};

export default HomePage;
