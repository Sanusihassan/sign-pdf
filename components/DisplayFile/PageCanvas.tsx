import React, { useRef, useEffect, useState } from "react";
import { renderPDFOnCanvas } from "@/src/utils";
import { useInView } from "react-intersection-observer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/src/store";
import InteractLayer from "./InteractLayer";
import { RootState } from "@/pages/_app";

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
    const [interactLayerInitialized, setInteractLayerInitialized] = useState(false);
    const acceptPointerEvents = useSelector((state: RootState) => state.tool.acceptPointerEvents);
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

    const [target, setTarget] = useState<HTMLElement | null>(null);
    return (
        <div className="page-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={ref} className="page" style={{ width: '100%', height: '100%' }}
                onMouseMove={(e) => {
                    const _target = e.target as HTMLElement;
                    setTarget(_target);
                    if ((target?.classList.contains("pdf-canvas")) || (target?.classList.contains("wrapper"))) {
                        dispatch(setField({
                            acceptPointerEvents: true
                        }));
                    }
                }}
                onClick={() => {
                    if ((target?.classList.contains("pdf-canvas")) || (target?.classList.contains("wrapper"))) {
                        dispatch(setField({
                            acceptPointerEvents: true
                        }));
                    }
                }}
            >
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
                        // if (interactLayerInitialized) {
                        //     dispatch(setField({
                        //         acceptPointerEvents: false
                        //     }));
                        // }
                    }}
                    onPanningStop={() => {
                        dispatch(setField({
                            acceptPointerEvents: false
                        }))
                    }}
                    onZoomStart={() => {
                        if (interactLayerInitialized) {
                            setField({
                                acceptPointerEvents: false
                            });
                        }
                    }}
                    onZoomStop={() => {
                        // dispatch(setField({
                        //     acceptPointerEvents: true
                        // }));
                        if ((target?.classList.contains("input")) || (target?.classList.contains("wrapper"))) {
                            dispatch(setField({
                                acceptPointerEvents: true
                            }))
                        }
                    }}
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
                    setInteractLayerInitialized={setInteractLayerInitialized}
                    id={id}
                />
            </div>
        </div>
    );
};

export default PageCanvas;