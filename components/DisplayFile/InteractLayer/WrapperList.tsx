// consider this 
import React, { CSSProperties } from 'react';
import { WrapperData } from '../InteractLayer';
import { Wrapper } from '../../i-text/Wrapper';
import { handleDuplicate, handleDelete, handleMove, handleResize, handleContentChange } from '../InteractLayer/handleWrappers';
import { useDispatch } from 'react-redux';
import { RootState } from '@/pages/_app';
import { useSelector } from 'react-redux';

interface WrapperListProps {
    wrappers: WrapperData[];
    className?: string;
    style?: CSSProperties;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    canvasRef: React.RefObject<HTMLDivElement>;
    updateWrappers: (newWrappers: WrapperData[]) => void;
}

const WrapperList: React.FC<WrapperListProps> = ({
    wrappers,
    className,
    style,
    onFocus,
    onInput,
    canvasRef,
    updateWrappers
}) => {
    const dispatch = useDispatch();
    const stateWrappers = useSelector((state: RootState) => state.tool.wrappers);

    return (
        <>
            {wrappers.map((wrapper) => (
                <Wrapper
                    key={wrapper.id}
                    id={wrapper.id}
                    initialContent={wrapper.content}
                    wrapper={wrapper}
                    onDuplicate={(id) => handleDuplicate(id, dispatch, updateWrappers, canvasRef, stateWrappers, wrappers)}
                    onDelete={_ => handleDelete(wrapper.id, dispatch, updateWrappers, wrappers, stateWrappers)}
                    onMove={(id, x, y) => handleMove(id, x, y, dispatch, updateWrappers, wrappers)}
                    onResize={(id, width, height) => handleResize(id, width, height, dispatch, updateWrappers, wrappers)}
                    onContentChange={(id, content) => handleContentChange(id, content, dispatch, updateWrappers, wrappers)}
                    onFocus={onFocus}
                    onInput={onInput}
                    className={className}
                    style={style}
                />
            ))}
        </>
    );
};

export default WrapperList;
