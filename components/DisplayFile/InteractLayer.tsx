import React, { CSSProperties, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { content_type } from '../i-text/Wrapper';
import { RootState } from '@/pages/_app';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage } from '@/src/language';
import { setField } from '@/src/store';
import { v4 as uuid } from 'uuid';
import WrapperList from './InteractLayer/WrapperList';

export interface WrapperData {
    id: string;
    content: content_type;
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
    font?: string;
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
    setInteractLayerInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

export type drop_type = "text" | "initials" | "date" | "checkbox" | "signature" | "whiteout";

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
    const allWrappers = useSelector((state: RootState) => state.tool.wrappers);
    const pageWrappers = allWrappers.filter(wrapper => wrapper.page === id);
    const canvasRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const updateWrappers = useCallback((newPageWrappers: WrapperData[]) => {
        const otherWrappers = allWrappers.filter(wrapper => wrapper.page !== id);
        const updatedAllWrappers = [...otherWrappers, ...newPageWrappers];
        dispatch(setField({ wrappers: updatedAllWrappers }));
    }, [allWrappers, id, dispatch]);

    const [, drop] = useDrop(
        () => ({
            accept: ["text", "date", "checkbox", "signature", "initials", "whiteout"],
            drop: (item: { type: drop_type, id: string }, monitor) => {
                const dropTarget = canvasRef.current;
                if (!dropTarget) return;

                const targetRect = dropTarget.getBoundingClientRect();
                const clientOffset = monitor.getClientOffset();

                if (clientOffset) {
                    const canvasX = clientOffset.x - targetRect.left;
                    const canvasY = clientOffset.y - targetRect.top;
                    if (pageWrappers.length) {
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
                    const { id: item_id } = item;
                    switch (item.type) {
                        case "checkbox":
                            content = { type: "checkbox" };
                            break;
                        case "signature":
                            content = { type: "signature", id: item_id };
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
                        case "whiteout":
                            content = { type: "whiteout" };
                            break;
                    }
                    const newWrapper: WrapperData = {
                        id: uuid(),
                        content,
                        x: canvasX,
                        y: canvasY,
                        width: item.type === 'checkbox' ? 50 : 200,
                        height: item.type === 'checkbox' ? 50 : 100,
                        page: id
                    };
                    updateWrappers([...pageWrappers, newWrapper]);
                }
            },
        }),
        [pageWrappers, updateWrappers]
    );

    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    const acceptPointerEvents = useSelector((state: RootState) => state.tool.acceptPointerEvents);

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
                    wrappers={pageWrappers}
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