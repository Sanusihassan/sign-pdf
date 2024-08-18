import React, { useState } from 'react';
import { FaListUl, FaListOl } from 'react-icons/fa6';

export const ListTool = () => {
    const [isUnorderedList, setIsUnorderedList] = useState(true);

    const handleClick = () => {
        setIsUnorderedList((prev) => !prev);
    };

    const CurrentIcon = isUnorderedList ? FaListUl : FaListOl;

    return (
        <div className="list-tool" onClick={handleClick}>
            <CurrentIcon />
        </div>
    );
};
