import { useMemo } from "react";

interface UsePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const usePagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: UsePaginationProps) => {
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const maxButtons = 5;
    let startPage: number, endPage: number;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfMax = Math.floor(maxButtons / 2);

      if (currentPage <= halfMax) {
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + halfMax >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfMax;
        endPage = currentPage + halfMax;
      }
    }

    if (startPage > 1) range.push(1);
    if (startPage > 2) range.push("...");

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages - 1) range.push("...");
    if (endPage < totalPages) range.push(totalPages);

    return range;
  };

  const paginationRange = useMemo(getPaginationRange, [
    totalPages,
    currentPage,
  ]);

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      onPageChange(1);
    } else {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      onPageChange(totalPages);
    } else {
      onPageChange(currentPage - 1);
    }
  };

  const handleRightJump = (amount: number) => {
    if (currentPage + amount > totalPages) {
      onPageChange(1);
    } else {
      onPageChange(currentPage + amount);
    }
  };

  const handleLeftJump = (amount: number) => {
    if (currentPage - amount < 1) {
      onPageChange(totalPages);
    } else {
      onPageChange(currentPage - amount);
    }
  };

  return {
    paginationRange,
    handleNextPage,
    handlePrevPage,
    handleRightJump,
    handleLeftJump,
  };
};
