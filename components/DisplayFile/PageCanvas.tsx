import React, { useRef, useEffect, useState } from "react";
import { renderPDFOnCanvas } from "@/src/utils";
import { useInView } from "react-intersection-observer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from "react-redux";
import { setField } from "@/src/store";
import InteractLayer from "./InteractLayer";

interface PageCanvasProps {
    id: number;
    file: File;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    isVisible: boolean;
}

export const PageCanvas: React.FC<PageCanvasProps> = ({
    id,
    file,
    setCurrentPage,
    isVisible
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
    const { ref, inView } = useInView({ threshold: 0.01, triggerOnce: false });
    const dispatch = useDispatch();
    const [interactLayerSize, setInteractLayerSize] = useState({ width: 0, height: 0 });
    const [acceptPointerEvents, setAcceptPointerEvents] = useState(true);
    const [interactLayerInitialized, setInteractLayerInitialized] = useState(false);
    useEffect(() => {
        if (inView) {
            setCurrentPage(id);
        }
    }, [inView, id, setCurrentPage]);

    useEffect(() => {
        if (isVisible && pdfCanvasRef.current && containerRef.current) {
            renderPDFOnCanvas(pdfCanvasRef.current, id, file);
            const updateSize = () => {
                if (containerRef.current) {
                    const { width, height } = containerRef.current.getBoundingClientRect();
                    setInteractLayerSize({ width, height });
                }
            };
            updateSize();
            const resizeObserver = new ResizeObserver(updateSize);
            resizeObserver.observe(containerRef.current);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [isVisible, id, file]);

    const handleFocus = () => {
        dispatch(setField({ showStyleTools: true }));
    };

    const handleBlur = () => {
        dispatch(setField({ showStyleTools: false }));
    };

    return (
        <div className="page-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={ref} className="page" style={{ width: '100%', height: '100%' }}>
                <TransformWrapper
                    initialScale={1}
                    pinch={{ step: 10 }}
                    limitToBounds={true}
                    centerOnInit={true}
                    minScale={1}
                    maxScale={3}
                    doubleClick={{ mode: "toggle" }}
                    wheel={{ disabled: false }}
                    panning={{ disabled: false }}
                    onPanningStart={() => {
                        if (interactLayerInitialized) {
                            setAcceptPointerEvents(false)
                        }
                    }}
                    onPanningStop={() => setAcceptPointerEvents(true)}
                    onZoomStart={() => {
                        if (interactLayerInitialized) {
                            setAcceptPointerEvents(false);
                        }
                    }}
                    onZoomStop={() => setAcceptPointerEvents(true)}
                >
                    <TransformComponent>
                        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <canvas
                                ref={pdfCanvasRef}
                                className="pdf-canvas img-fluid-custom object-fit-contain rounded item-img"
                                id={`pdf-page-${id}`}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
                <InteractLayer
                    width={interactLayerSize.width}
                    height={interactLayerSize.height}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    acceptPointerEvents={acceptPointerEvents}
                    setAcceptPointerEvents={setAcceptPointerEvents}
                    setInteractLayerInitialized={setInteractLayerInitialized}
                />
            </div>
        </div>
    );
};

export default PageCanvas;