import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus, FaArrowsAltH, FaExpand } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: 'fit-width' | 'fit-page' | 'zoom-in' | 'zoom-out') => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onZoomChange
}) => {
  const [fitType, setFitType] = useState<'fit-width' | 'fit-page'>('fit-width');
  const [inputValue, setInputValue] = useState(currentPage.toString());

  const handleFitToggle = () => {
    const newFitType = fitType === 'fit-width' ? 'fit-page' : 'fit-width';
    setFitType(newFitType);
    onZoomChange(newFitType);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const page = parseInt(value, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
  };

  return (
    <div className="page-navigator">
      <Tooltip id="prev-tooltip" />
      <Tooltip id="next-tooltip" />
      <Tooltip id="fit-tooltip" />
      <Tooltip id="zoom-in-tooltip" />
      <Tooltip id="zoom-out-tooltip" />

      <button
        className="nav-button nav-button-prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        data-tooltip-id="prev-tooltip"
        data-tooltip-content="Previous Page"
      >
        <FaChevronLeft />
      </button>

      <div className="page-info">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={handleInputChange}
          className="page-number"
        />
        <span className="separator">of {totalPages}</span>
      </div>

      <button
        className="nav-button fit-toggle-button"
        onClick={handleFitToggle}
        data-tooltip-id="fit-tooltip"
        data-tooltip-content={fitType === 'fit-width' ? 'Fit Width' : 'Fit Page'}
      >
        {fitType === 'fit-width' ? <FaArrowsAltH /> : <FaExpand />}
      </button>

      <button
        className="zoom-button"
        onClick={() => onZoomChange('zoom-in')}
        data-tooltip-id="zoom-in-tooltip"
        data-tooltip-content="Zoom In"
      >
        <FaSearchPlus />
      </button>

      <button
        className="zoom-button"
        onClick={() => onZoomChange('zoom-out')}
        data-tooltip-id="zoom-out-tooltip"
        data-tooltip-content="Zoom Out"
      >
        <FaSearchMinus />
      </button>

      <button
        className="nav-button nav-button-next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        data-tooltip-id="next-tooltip"
        data-tooltip-content="Next Page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PageNavigator;