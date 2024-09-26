// the problem is that each time the wrappers is updated i loose the previous state.
// i don't want this because the wrappers are dropped on a particular page each page should.
// now when the previous state is cleared i only get somthing like this: [{"id":1727117046233,"content":{"type":"signature"},"x":303,"y":97.54169464111328,"width":200,"height":129.333,"page":2}]
// even if i added a particle to the previous page i.e page one before adding it to the current page which is page 2
// please give me the complete code solution, because i'm going to replace the current code with the one you'll give me.
// each time i scroll to a particular page i get only the wrappers of that page.
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import useUndo from 'use-undo';
import { useDrop } from 'react-dnd';
import { content_type } from '../i-text/Wrapper';
import { RootState } from '@/pages/_app';
import { useSelector } from 'react-redux';
import { getLanguage } from '@/src/language';
import { setField } from '@/src/store';
import { useDispatch } from 'react-redux';

export interface WrapperData {
    id: number;
    content: content_type;
    x: number;
    y: number;
    width: number;
    height: number;
    page: number
}

interface InteractLayerProps {
    width: string | number;
    height: string | number;
    className?: string;
    style?: CSSProperties;
    id: number;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    setInteractLayerInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

import WrapperList from './InteractLayer/WrapperList';

interface InteractLayerProps {
    width: string | number;
    height: string | number;
    className?: string;
    style?: CSSProperties;
    id: number;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    setInteractLayerInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

export type drop_type = "text" | "initials" | "date" | "checkbox" | "signature";

export const InteractLayer = ({
    width,
    height,
    className,
    style,
    id,
    onFocus,
    onInput,
    onBlur,
    setInteractLayerInitialized
}: InteractLayerProps) => {
    const [wrappersState, { set: setWrappers, undo: undoWrappers, redo: redoWrappers, canUndo, canRedo }] = useUndo<WrapperData[]>([]);
    const { present } = wrappersState;
    const wrappers = useSelector((state: RootState) => state.tool.wrappers);
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateWrappers = useCallback((newWrappers: WrapperData[]) => {
        setWrappers(newWrappers);
    }, [setWrappers]);

    useEffect(() => {

        if (!stateWrappers.length) {
            dispatch(setField({
                wrappers: present
            }));
        }
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

    const [, drop] = useDrop(
        () => ({
            accept: ["text", "date", "checkbox", "signature", "initials"],
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
                        page: id
                    };
                    updateWrappers([...wrappers, newWrapper]);
                }
            },
        }),
        [wrappers, updateWrappers]
    );

    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    const acceptPointerEvents = useSelector((state: RootState) => state.tool.acceptPointerEvents);
    const stateWrappers = useSelector((state: RootState) => state.tool.wrappers);
    const insertActiveSignatureToCurrentPage = useSelector((state: RootState) => state.tool.insertActiveSignatureToCurrentPage);
    const dispatch = useDispatch();

    const disablePointerEvents = () => {
        dispatch(setField({ acceptPointerEvents: false }));
    };


    return (
        <div
            ref={drop}
            className={`canvas`}
            style={{ width, height, position: 'absolute', top: 0 }}
        >
            <div
                ref={canvasRef}
                style={{ width: '100%', height: '100%', pointerEvents: acceptPointerEvents ? "auto" : "none" }}
                onClick={(e) => {
                    const target = e.target as HTMLElement;
                    e.stopPropagation();
                    if (!(target.classList.contains("input")) && !(target.classList.contains("wrapper"))) {
                        if (onBlur || !showStyleTools) {
                            if (onBlur) onBlur();
                            disablePointerEvents();
                        }
                    } else {
                        if (onFocus) onFocus();
                    }
                }}
            >
                <WrapperList
                    wrappers={wrappers}
                    updateWrappers={updateWrappers}
                    canvasRef={canvasRef}
                    className={className}
                    style={style}
                    onFocus={onFocus}
                    onInput={onInput}
                />
            </div>
        </div>
    );
};

export default InteractLayer;
