import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageButtons = [];

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === currentPage ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination" style={{ padding: "10px" }}>
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        First Page
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      {pageButtons}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
      <button onClick={handleLastPage} disabled={currentPage === totalPages}>
        Last Page
      </button>
    </div>
  );
}

export default Pagination;
