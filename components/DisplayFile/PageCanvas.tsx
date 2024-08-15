import React, { useRef, useEffect, useState, useCallback } from "react";
import { renderPDFOnCanvas } from "@/src/utils";
import { useInView } from "react-intersection-observer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';

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
    const fabricCanvasRef = useRef<HTMLCanvasElement>(null);
    const fabricInstanceRef = useRef<fabric.Canvas | null>(null);
    const { ref, inView } = useInView({ threshold: 0.01, triggerOnce: false });
    const [tempInput, setTempInput] = useState<fabric.IText | null>(null);

    const [, drop] = useDrop(() => ({
        accept: 'text',
        hover: (item, monitor) => {
            const dropTarget = fabricCanvasRef.current;
            if (!dropTarget) return;

            const targetRect = dropTarget.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                const canvasX = clientOffset.x - targetRect.left;
                const canvasY = clientOffset.y - targetRect.top;

                if (tempInput) {
                    tempInput.set({ left: canvasX, top: canvasY });
                    fabricInstanceRef.current?.renderAll();
                } else {
                    const newInput = new fabric.IText('Enter text', {
                        left: canvasX,
                        top: canvasY,
                        fontSize: 20,
                        fill: 'black',
                    });
                    setTempInput(newInput);
                    fabricInstanceRef.current?.add(newInput);
                }
            }
        },
        drop: (item, monitor) => {
            if (tempInput) {
                tempInput.setCoords();
                fabricInstanceRef.current?.setActiveObject(tempInput);
                fabricInstanceRef.current?.renderAll();
                setTempInput(null);
            }
        },
    }), [tempInput]);

    useEffect(() => {
        if (inView) {
            setCurrentPage(id);
        }
    }, [inView, id, setCurrentPage]);

    const handleFabricMouseDown = useCallback((e: fabric.IEvent) => {
        const target = e.target;
        if (target && (target.type === 'i-text' || target.type === 'textbox')) {
            e.e.stopPropagation();
        }
    }, []);

    useEffect(() => {
        if (isVisible && pdfCanvasRef.current && fabricCanvasRef.current && containerRef.current) {
            renderPDFOnCanvas(pdfCanvasRef.current, id, file);

            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;

            fabricCanvasRef.current.width = containerWidth;
            fabricCanvasRef.current.height = containerHeight;

            fabricInstanceRef.current = new fabric.Canvas(fabricCanvasRef.current, {
                width: containerWidth,
                height: containerHeight,
            });

            fabricInstanceRef.current.on('mouse:down', handleFabricMouseDown);

            const resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.target === containerRef.current) {
                        const { width, height } = entry.contentRect;
                        fabricInstanceRef.current?.setDimensions({ width, height });
                        fabricInstanceRef.current?.renderAll();
                    }
                }
            });

            resizeObserver.observe(containerRef.current);

            return () => {
                fabricInstanceRef.current?.off('mouse:down', handleFabricMouseDown);
                fabricInstanceRef.current?.dispose();
                resizeObserver.disconnect();
            };
        }
    }, [isVisible, id, file, handleFabricMouseDown]);

    return (
        <div ref={drop} className="page-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={ref} className="page" style={{ width: '100%', height: '100%' }}>
                <TransformWrapper
                    initialScale={1}
                    pinch={{ step: 10 }}
                    limitToBounds={true}
                    centerOnInit={true}
                    minScale={1}
                    maxScale={3}
                    doubleClick={{ mode: "toggle" }}
                    wheel={{ disabled: true }}
                >
                    <TransformComponent>
                        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <canvas
                                ref={pdfCanvasRef}
                                className="pdf-canvas img-fluid-custom object-fit-contain rounded item-img"
                                id={`pdf-page-${id}`}
                                style={{ width: '100%', height: '100%' }}
                            />
                            <canvas
                                ref={fabricCanvasRef}
                                className="fabric-canvas"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'auto',
                                }}
                            />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    );
};