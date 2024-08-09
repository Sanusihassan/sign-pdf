import { ActionProps } from "./ActionDiv";
import type { errors as _ } from "../../content";
import { useEffect, useState, createRef } from "react";
import { Loader } from "./Loader";
import { calculatePages, renderPDFOnCanvas } from "../../src/utils";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setField } from "@/src/store";
import PageNavigator from "./PageNavigator";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

const FileCard = ({
  file,
  extension,
  loader_text,
}: CardProps) => {
  const [canvasRefs, setCanvasRefs] = useState<CanvasRefType>([]);
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let isSubscribed = true;

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

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const page = parseInt(entry.target.id.replace('page-', ''), 10);
          setCurrentPage(page);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    canvasRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      canvasRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [canvasRefs]);

  const handleZoomChange = (zoomType: 'fit-width' | 'fit-page' | 'zoom-in' | 'zoom-out') => {
    // To be implemented based on requirements
  };

  return (
    <>
      {canvasRefs.length === 0 ? (
        <div className="initial-loader">
          <Loader loader_text={loader_text} />
        </div>
      ) : (
        <div className="pages">
          {canvasRefs.map(({ ref, id }) => (
            <div key={id.toString()} className="page">
              <TransformWrapper
                initialScale={1}
                pinch={{ step: 10 }}
                limitToBounds={true}
                centerOnInit
                minScale={1}
                maxScale={3}
                doubleClick={{
                  mode: "toggle",
                  animationType: "easeInOutQuad",
                }}
                wheel={{
                  disabled: true
                }}
              >
                <TransformComponent>
                  <canvas ref={ref} className="img-fluid-custom object-fit-contain rounded item-img" id={`page-${id}`} />
                </TransformComponent>
              </TransformWrapper>
            </div>
          ))}
          <div className="page-navigator-wrapper">
            <PageNavigator
              currentPage={currentPage}
              totalPages={pageCount}
              onZoomChange={handleZoomChange}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FileCard;
