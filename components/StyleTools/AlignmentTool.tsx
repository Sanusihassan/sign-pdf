import React, { useState } from 'react';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa6';
// import { CiTextAlignJustify, CiTextAlignLeft, CiTextAlignCenter, CiTextAlignRight } from "react-icons/ci";

// const icons = [
//     CiTextAlignJustify,
//     CiTextAlignLeft,
//     CiTextAlignCenter,
//     CiTextAlignRight,
// ];
const icons = [
    FaAlignJustify,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
];

export const AlignmentTool = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    const handleClick = () => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    };

    const CurrentIcon = icons[currentIconIndex];

    return (
        <div className="alignment-tool" onClick={handleClick}>
            <CurrentIcon />
        </div>
    );
};
