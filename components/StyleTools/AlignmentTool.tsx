import { useFileStore } from '@/src/file-store';
import React, { useState } from 'react';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa6';

const icons = [
    FaAlignJustify,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
];

export const AlignmentTool = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const { currentTextElement } = useFileStore();

    const handleClick = () => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        console.log(currentIconIndex)

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

        if (currentTextElement) {
            currentTextElement.style.textAlign = textAlignValue;
        }
    };

    const CurrentIcon = icons[currentIconIndex];

    return (
        <div onClick={handleClick}>
            <CurrentIcon />
        </div>
    );
};
