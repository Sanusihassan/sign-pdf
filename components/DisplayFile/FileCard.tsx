import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionProps } from "./ActionDiv";
import type { errors as _ } from "../../content";
import { Loader } from "./Loader";
import { calculatePages, renderPDFOnCanvas } from "../../src/utils";
import { ToolState, setField } from "@/src/store";
import PageNavigator from "./PageNavigator";
import PageCanvas from "./PageCanvas";

type OmitFileName<T extends ActionProps> = Omit<T, "fileName" | "index">;

type CardProps = OmitFileName<ActionProps> & {
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  index?: number | string;
};

export type CanvasRefType = {
  ref: React.RefObject<HTMLCanvasElement>;
  id: number;
}[];

const FileCard: React.FC<CardProps> = ({
  file,
  extension,
  loader_text,
}) => {
  const [canvasRefs, setCanvasRefs] = useState<CanvasRefType>([]);
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let isSubscribed = true;
  const [zoomLevel, setZoomLevel] = useState(1);

  const processFile = async () => {
    try {
      if (extension && extension === ".pdf") {
        if (isSubscribed) {
          const newCanvasRefs: CanvasRefType = [];
          for (let i = 1; i <= pageCount; i += 1) {
            const canvasRef = createRef<HTMLCanvasElement>();
            newCanvasRefs.push({ ref: canvasRef, id: i });
          }
          setCanvasRefs(newCanvasRefs);
        }
      } else if (extension && extension !== ".jpg") {
        if (isSubscribed) {
          setCanvasRefs(
            !file.size
              ? [{ ref: createRef<HTMLCanvasElement>(), id: 1 }]
              : [{ ref: createRef<HTMLCanvasElement>(), id: 1 }]
          );
        }
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  useEffect(() => {
    (async () => {
      let _pageCount = await calculatePages(file);
      dispatch(setField({ pageCount: _pageCount }));
    })();
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file, pageCount]);

  useEffect(() => {
    canvasRefs.forEach(({ ref, id }) => {
      if (ref.current) {
        renderPDFOnCanvas(ref.current, id, file);
      }
    });
  }, [canvasRefs]);

  const handleZoomChange = (zoomType: 'fit-width' | 'fit-page' | 'zoom-in' | 'zoom-out') => {
    switch (zoomType) {
      case "zoom-in":
        setZoomLevel(prevZoom => {
          let zoomInAmount = Math.min(prevZoom + 0.1, 3);
          if (zoomInAmount >= 1) {
            zoomInAmount = 1;
          }
          return zoomInAmount;
        }); // Max zoom of 3x
        break;
      case "zoom-out":
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Min zoom of 0.5x
        break;
      case "fit-width":
        setZoomLevel(1);
        break;
      case "fit-page":
        setZoomLevel(.75);
        break;
    }
  };


  return (
    <>
      {canvasRefs.length === 0 ? (
        <div className="initial-loader">
          <Loader loader_text={loader_text} />
        </div>
      ) : (
        <>
          <div className="pages">
            {canvasRefs.map(({ ref, id }) => (
              <PageCanvas key={id} id={id} canvasRef={ref} setCurrentPage={setCurrentPage} zoomLevel={zoomLevel} />
            ))}
          </div>
          <div className="page-navigator-wrapper">
            <PageNavigator
              currentPage={currentPage}
              totalPages={pageCount}
              onZoomChange={handleZoomChange}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FileCard;