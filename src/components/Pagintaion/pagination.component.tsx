import React from "react";
import styles from "./pagintaion.module.scss";
import { usePagination } from "../../hooks/usePagination"; // Импортируем хук

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  mode: "regular" | "cyclic";
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  mode,
}) => {
  const {
    paginationRange,
    handleNextPage,
    handlePrevPage,
    handleRightJump,
    handleLeftJump,
  } = usePagination({
    totalPages,
    currentPage,
    onPageChange,
  });

  return (
    <div className={styles["pagination"]}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1 && mode === "regular"}
      >
        Previous
      </button>
      <button
        onClick={() => handleLeftJump(2)}
        disabled={currentPage - 2 < 1 && mode === "regular"}
      >
        «
      </button>

      <ul>
        {paginationRange.map((page, index) =>
          typeof page === "number" ? (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={
                  currentPage === page ? styles["pagination-active"] : ""
                }
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ) : (
            <li key={index} className={styles["pagination-ellipsis"]}>
              {page}
            </li>
          ),
        )}
      </ul>
      <button
        onClick={() => handleRightJump(2)}
        disabled={currentPage + 2 > totalPages && mode === "regular"}
      >
        »
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages && mode === "regular"}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
