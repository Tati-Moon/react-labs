import Image from 'next/image';
import React, { useContext } from 'react';
import styles from './index.module.scss';

import { ThemeContext } from '../../../context/themeContext';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    event.stopPropagation();
    onPageChange(page);
  };

  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.paginationContainer, {
        [styles.paginationContainer_light]: isLight,
      })}
    >
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={(e) => handlePageChange(e, currentPage - 1)}
        >
          <Image
            src="/icons/previous.png"
            width="11"
            height="11"
            alt="previous"
            priority
            className={styles.downloadsIcon}
          />
          Previous
        </button>
        <span className={styles.paginationInfo}>
          <h4>
            Page {currentPage} of {totalPages}
          </h4>
        </span>
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages}
          data-testid="next-page"
          onClick={(e) => handlePageChange(e, currentPage + 1)}
        >
          Next
          <Image
            src="/icons/next.png"
            width="11"
            height="11"
            alt="next"
            priority
            className={styles.nextIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
