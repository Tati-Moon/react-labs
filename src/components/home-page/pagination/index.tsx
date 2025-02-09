import React from 'react';
import './index.scss';

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
    <div className="pagination-container">
      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={(e) => handlePageChange(e, currentPage - 1)}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          data-testid="next-page"
          onClick={(e) => handlePageChange(e, currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
