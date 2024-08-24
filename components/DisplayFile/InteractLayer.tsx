import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import useUndo from 'use-undo';

import { useDrop } from 'react-dnd';
import { content_type, Wrapper } from '../i-text/Wrapper';
import { RootState } from '@/pages/_app';
import { useSelector } from 'react-redux';
import { getLanguage } from '@/src/language';
import { setField } from '@/src/store';
import { useDispatch } from 'react-redux';


interface WrapperData {
    id: number;
    content: content_type;
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
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    setInteractLayerInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

export const InteractLayer: React.FC<InteractLayerProps> = ({
    width,
    height,
    className,
    style,
    onFocus,
    onInput,
    onBlur,
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
    type drop_type = "text" | "initials" | "date" | "checkbox" | "signature";
    const [, drop] = useDrop(
        () => ({
            accept: ["text", "date", "checkbox", "signature"],
            drop: (item: { type: drop_type }, monitor) => {
                const dropTarget = canvasRef.current;
                if (!dropTarget) return;

                const targetRect = dropTarget.getBoundingClientRect();
                const clientOffset = monitor.getClientOffset();

                if (clientOffset) {
                    const canvasX = clientOffset.x - targetRect.left;
                    const canvasY = clientOffset.y - targetRect.top;
                    if (wrappers.length) {
                        setInteractLayerInitialized(true);
                    } else {
                        setInteractLayerInitialized(false);
                    }
                    const lang = getLanguage() || "";
                    const locale = lang || 'en-US';

                    const formattedDate = new Date().toLocaleString(locale, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    });

                    let content: content_type;
                    switch (item.type) {
                        case "checkbox":
                            content = { type: "checkbox" };
                            break;
                        case "signature":
                            content = { type: "signature" };
                            break;
                        case "date":
                            content = formattedDate;
                            break;
                        case "initials":
                            content = { type: "initials" };
                            break;
                        case "text":
                            content = "New text";
                            break;
                    }

                    const newWrapper: WrapperData = {
                        id: Date.now(),
                        content,
                        x: canvasX,
                        y: canvasY,
                        width: item.type === 'checkbox' ? 50 : 200,
                        height: item.type === 'checkbox' ? 50 : 100,
                    };

                    updateWrappers([...wrappers, newWrapper]);
                }
            },
        }),
        [wrappers, updateWrappers]
    );


    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    const acceptPointerEvents = useSelector((state: RootState) => state.tool.acceptPointerEvents);
    const dispatch = useDispatch();

    const disablePointerEvents = () => {
        dispatch(setField({ acceptPointerEvents: false }));
    }
    return (
        <div
            ref={drop}
            className={`canvas`}
            style={{ width, height, position: 'absolute', top: 0, }}
        >
            <div ref={canvasRef} style={{ width: '100%', height: '100%', pointerEvents: acceptPointerEvents ? "auto" : "none" }} onClick={(e) => {
                const target = (e.target as HTMLElement);
                e.stopPropagation();
                if (!(target.classList.contains("input")) && !(target.classList.contains("wrapper"))) {
                    if (onBlur || !showStyleTools) {
                        if (onBlur) {
                            onBlur();
                        }
                        disablePointerEvents();
                    }
                } else {
                    if (onFocus)
                        onFocus();
                }
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