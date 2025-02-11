import React from 'react';
import styles from './index.module.scss';
import nextIcon from '../../../assets/icons/next.png';
import previousIcon from '../../../assets/icons/previous.png';

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
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={(e) => handlePageChange(e, currentPage - 1)}
        >
          <img
            src={previousIcon}
            alt="previous"
            className={styles.previousIcon}
          />
          Previous
        </button>
        <span className={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages}
          data-testid="next-page"
          onClick={(e) => handlePageChange(e, currentPage + 1)}
        >
          Next <img src={nextIcon} alt="next" className={styles.nextIcon} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
