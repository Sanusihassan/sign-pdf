import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useInView } from 'react-intersection-observer';
import { ActionProps } from "./ActionDiv";
import type { errors as _ } from "../../content";
import { Loader } from "./Loader";
import { calculatePages, renderPDFOnCanvas } from "../../src/utils";
import { ToolState, setField } from "@/src/store";
import PageNavigator from "./PageNavigator";

type OmitFileName<T extends ActionProps> = Omit<T, "fileName" | "index">;

type CardProps = OmitFileName<ActionProps> & {
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  index?: number | string;
};

interface PageCanvasProps {
  id: number;
  file: File;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
}

const PageCanvas: React.FC<PageCanvasProps> = ({ id, file, setCurrentPage, isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setCurrentPage(id);
    }
  }, [inView, id, setCurrentPage]);

  useEffect(() => {
    if (isVisible && canvasRef.current) {
      renderPDFOnCanvas(canvasRef.current, id, file);
    }
  }, [isVisible, id, file]);

  return (
    <div ref={ref} className="page">
      <TransformWrapper
        initialScale={1}
        pinch={{ step: 10 }}
        limitToBounds={true}
        centerOnInit={true}
        minScale={1}
        maxScale={3}
        doubleClick={{ mode: "toggle", animationType: "easeInOutQuad" }}
        wheel={{ disabled: true }}
      >
        <TransformComponent>
          <canvas
            ref={canvasRef}
            className="img-fluid-custom object-fit-contain rounded item-img"
            id={`page-${id}`}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

const FileCard: React.FC<CardProps> = ({ file, extension, loader_text }) => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state: { tool: ToolState }) => state.tool.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pagesContainerRef = useRef<HTMLDivElement>(null);

  const visiblePagesRange = 5; // Number of pages to render around the current page

  useEffect(() => {
    const calculatePageCount = async () => {
      const count = await calculatePages(file);
      dispatch(setField({ pageCount: count }));
      setIsLoading(false);
    };

    calculatePageCount();
  }, [file, dispatch]);


  const handleZoomChange = useCallback(
    (zoomType: 'fit-width' | 'fit-page' | 'zoom-in' | 'zoom-out') => {
      switch (zoomType) {
        case "zoom-in":
          setZoomLevel(prevZoomLavel => {
            let newZoomLevel = Math.min(prevZoomLavel + 0.1, 3);
            if (newZoomLevel >= 1) {
              newZoomLevel = 1;
            }
            return newZoomLevel;
          })
          break;
        case "zoom-out":
          setZoomLevel(prevZoomLavel => Math.max(prevZoomLavel - 0.1, 0.5));
          break;
        case "fit-width":
          setZoomLevel(1);
          break;
        case "fit-page":
          setZoomLevel(0.75);
          break;
        default:
          setZoomLevel(zoomLevel);
      }
    }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    if (pagesContainerRef.current) {
      const pageElement = pagesContainerRef.current.children[newPage - 1] as HTMLElement;
      if (pageElement) {
        pagesContainerRef.current.scrollTo({
          top: pageElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const memoizedPageNavigator = useMemo(() => (
    <PageNavigator
      currentPage={currentPage}
      totalPages={pageCount}
      onZoomChange={handleZoomChange}
      onPageChange={handlePageChange}
    />
  ), [currentPage, pageCount, handleZoomChange, handlePageChange]);

  const renderPages = useCallback(() => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      const isVisible = Math.abs(i - currentPage) <= Math.floor(visiblePagesRange / 2);
      pages.push(
        <PageCanvas
          key={i}
          id={i}
          file={file}
          setCurrentPage={setCurrentPage}
          isVisible={isVisible}
        />
      );
    }
    return pages;
  }, [pageCount, currentPage, file, visiblePagesRange]);

  if (isLoading) {
    return <Loader loader_text={loader_text} />;
  }

  return (
    <>
      <div className={`pages scale-${zoomLevel.toFixed(1).replace(".", "_")}`} ref={pagesContainerRef}>
        {renderPages()}
      </div>
      <div className="page-navigator-wrapper">
        {memoizedPageNavigator}
      </div>
    </>
  );
};

export default React.memo(FileCard);