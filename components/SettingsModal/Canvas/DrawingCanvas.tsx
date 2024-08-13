import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

interface DrawingCanvasProps {
    color: string;
    onEmptyStateChange?: (isEmpty: boolean) => void;
}

export interface DrawingCanvasRef {
    undo: () => void;
    redo: () => void;
    isCanvasEmpty: () => Promise<boolean>;
    getImage: () => Promise<string>;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ color, onEmptyStateChange }, ref) => {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const isCanvasEmpty = useCallback(async () => {
        const paths = await canvasRef.current?.exportPaths();
        return paths ? paths.length === 0 : true;
    }, []);

    useImperativeHandle(ref, () => ({
        undo: () => canvasRef.current?.undo(),
        redo: () => canvasRef.current?.redo(),
        isCanvasEmpty,
        getImage: () => {
            if (containerRef.current) {
                const svgElement = containerRef.current.querySelector('svg');
                if (svgElement) {
                    const serializer = new XMLSerializer();
                    const svgString = serializer.serializeToString(svgElement);
                    return Promise.resolve(svgString);
                }
            }
            return Promise.resolve('');
        },
    }));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'z') {
                canvasRef.current?.undo();
            } else if (event.ctrlKey && event.key === 'y') {
                canvasRef.current?.redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const checkCanvasEmpty = useCallback(async () => {
        const empty = await isCanvasEmpty();
        if (empty !== isEmpty) {
            setIsEmpty(empty);
            onEmptyStateChange?.(empty);
        }
    }, [isEmpty, isCanvasEmpty, onEmptyStateChange]);

    useEffect(() => {
        checkCanvasEmpty();
    }, [checkCanvasEmpty]);

    const handleCanvasChange = () => {
        checkCanvasEmpty();
    };

    return (
        <div className="drawing-canvas" ref={containerRef}>
            <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={4}
                strokeColor={color}
                className="canvas"
                onChange={handleCanvasChange}
            />
        </div>
    );
});

DrawingCanvas.displayName = 'DrawingCanvas';
