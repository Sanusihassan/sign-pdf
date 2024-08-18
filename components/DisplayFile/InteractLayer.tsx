import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import useUndo from 'use-undo';

import { useDrop } from 'react-dnd';
import { Wrapper } from '../i-text/Wrapper';
import { RootState } from '@/pages/_app';
import { useSelector } from 'react-redux';

interface WrapperData {
    id: number;
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface InteractLayerProps {
    width: string | number;
    height: string | number;
    className?: string;
    style?: CSSProperties;
    acceptPointerEvents: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    setAcceptPointerEvents: React.Dispatch<React.SetStateAction<boolean>>,
    setInteractLayerInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

export const InteractLayer: React.FC<InteractLayerProps> = ({
    width,
    height,
    className,
    style,
    acceptPointerEvents,
    onFocus,
    onInput,
    onBlur,
    setAcceptPointerEvents,
    setInteractLayerInitialized
}) => {
    const [wrappersState, { set: setWrappers, undo: undoWrappers, redo: redoWrappers, canUndo, canRedo }] = useUndo<WrapperData[]>([]);
    const { present: wrappers } = wrappersState;
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateWrappers = useCallback((newWrappers: WrapperData[]) => {
        setWrappers(newWrappers);
    }, [setWrappers]);

    const handleDuplicate = (id: number) => {
        const wrapperToDuplicate = wrappers.find(w => w.id === id);
        if (wrapperToDuplicate) {
            const canvasRect = canvasRef.current?.getBoundingClientRect();
            const newX = Math.min(wrapperToDuplicate.x + 10, (canvasRect?.width || 0) - wrapperToDuplicate.width);
            const newY = Math.min(wrapperToDuplicate.y + 10, (canvasRect?.height || 0) - wrapperToDuplicate.height);
            const newWrappers = [...wrappers, { ...wrapperToDuplicate, id: Date.now(), x: newX, y: newY }];
            updateWrappers(newWrappers);
        }
    };

    const handleDelete = (id: number) => {
        const newWrappers = wrappers.filter(w => w.id !== id);
        updateWrappers(newWrappers);
    };

    const handleMove = (id: number, x: number, y: number) => {
        const newWrappers = wrappers.map(w => w.id === id ? { ...w, x, y } : w);
        updateWrappers(newWrappers);
    };

    const handleResize = (id: number, width: number, height: number) => {
        const newWrappers = wrappers.map(w => w.id === id ? { ...w, width, height } : w);
        updateWrappers(newWrappers);
    };

    const handleContentChange = (id: number, content: string) => {
        const newWrappers = wrappers.map(w => w.id === id ? { ...w, content } : w);
        updateWrappers(newWrappers);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'z' && canUndo) {
                e.preventDefault();
                undoWrappers();
            } else if (e.ctrlKey && e.key === 'y' && canRedo) {
                e.preventDefault();
                redoWrappers();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, undoWrappers, redoWrappers]);

    const [, drop] = useDrop(() => ({
        accept: 'text',
        drop: (item, monitor) => {
            const dropTarget = canvasRef.current;
            if (!dropTarget) return;

            const targetRect = dropTarget.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                const canvasX = clientOffset.x - targetRect.left;
                const canvasY = clientOffset.y - targetRect.top;
                if (wrappers.length) {
                    setInteractLayerInitialized(true)
                } else {
                    setInteractLayerInitialized(false)
                }

                const newWrapper: WrapperData = {
                    id: Date.now(),
                    content: 'New text',
                    x: canvasX,
                    y: canvasY,
                    width: 200,
                    height: 100
                };

                updateWrappers([...wrappers, newWrapper]);
            }
        },
    }), [wrappers, updateWrappers]);


    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    return (
        <div
            ref={drop}
            className={`canvas`}
            style={{ width, height, position: 'absolute', top: 0, }}
        >
            <div ref={canvasRef} style={{ width: '100%', height: '100%', pointerEvents: acceptPointerEvents ? "auto" : "none" }} onClick={(e) => {
                const target = e.target;
                if (!(target as HTMLElement).classList.contains("input")) {
                    if (onBlur || !showStyleTools) {
                        if (onBlur) {
                            onBlur();
                        }
                        setAcceptPointerEvents(false)
                    }
                }
            }} onDoubleClick={() => {
                // setAcceptPointerEvents(false)
            }}>
                {wrappers.map(wrapper => (
                    <Wrapper
                        key={wrapper.id}
                        id={wrapper.id}
                        initialContent={wrapper.content}
                        initialX={wrapper.x}
                        initialY={wrapper.y}
                        initialWidth={wrapper.width}
                        initialHeight={wrapper.height}
                        onDuplicate={handleDuplicate}
                        onDelete={handleDelete}
                        onMove={handleMove}
                        onResize={handleResize}
                        onContentChange={handleContentChange}
                        onFocus={() => {
                            if (onFocus) {
                                onFocus();
                            }
                            // setAcceptPointerEvents(true)
                        }}
                        onInput={onInput}
                        className={className}
                        style={style}
                    />
                ))}
            </div>
        </div>
    );
};

export default InteractLayer;