import { RootState } from '@/pages/_app';
import { useFileStore } from '@/src/file-store';
import { applyStyle } from '@/src/utils';
import React, { useState } from 'react';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';

const icons = [
    FaAlignJustify,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
];

export const AlignmentTool = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const { currentTextElement } = useFileStore();
    const activeWrapper = useSelector((state: RootState) => state.tool.activeWrapper);
    const wrappers = useSelector((state: RootState) => state.tool.wrappers);
    const dispatch = useDispatch();
    const handleClick = () => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        let textAlignValue = "";
        switch (currentIconIndex) {
            case 0:
                textAlignValue = "left"
                break;
            case 1:
                textAlignValue = "center"
                break;
            case 2:
                textAlignValue = "right"
                break;
            case 3:
                textAlignValue = "justify"
                break;
            default:
                textAlignValue = "start";
        }
        applyStyle("textAlign", textAlignValue, activeWrapper, dispatch, wrappers);
    };

    const CurrentIcon = icons[currentIconIndex];

    return (
        <div onClick={handleClick}>
            <CurrentIcon />
        </div>
    );
};
