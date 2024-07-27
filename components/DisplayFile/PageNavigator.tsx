import React from 'react';

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
  onZoomChange,
}) => {
  return (
    <div className="page-navigator">
      <button
        className="nav-button nav-button-prev"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
      >
        &larr;
      </button>
      <div className="page-info">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={isNaN(currentPage) ? '' : currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value, 10);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
              onPageChange(page);
            }
          }}
          className="page-number"
        />
        <span className="separator">|</span>
        <div className="fit-options">
          <button
            className="fit-button"
            onClick={() => onZoomChange('fit-width')}
          >
            Fit Width
          </button>
          <button
            className="fit-button"
            onClick={() => onZoomChange('fit-page')}
          >
            Fit Page
          </button>
        </div>
        <span className="separator">|</span>
        <div className="zoom-controls">
          <button
            className="zoom-button"
            onClick={() => onZoomChange('zoom-in')}
          >
            Zoom In
          </button>
          <button
            className="zoom-button"
            onClick={() => onZoomChange('zoom-out')}
          >
            Zoom Out
          </button>
        </div>
      </div>
      <button
        className="nav-button nav-button-next"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default PageNavigator;
