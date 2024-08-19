import { useFileStore } from '@/src/file-store';
import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';

export interface FontOption {
    value: string;
    label: string;
    className: string;
}

interface FontSelectProps {
    selectedFont: FontOption | null;
    onFontChange: (selectedOption: FontOption | null) => void;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const FontSelect: React.FC<FontSelectProps> = ({ selectedFont, onFontChange, isOpen, setIsOpen }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fontOptions: FontOption[] = [
        { value: 'Cedarville Cursive', label: 'Cedarville Cursive', className: 'cedarville-cursive-regular' },
        { value: 'Arizonia', label: 'Arizonia', className: 'arizonia-regular' },
        { value: 'Lobster', label: 'Lobster', className: 'lobster-regular' },
        { value: 'Rouge Script', label: 'Rouge Script', className: 'rouge-script-regular' },
        { value: 'Alex Brush', label: 'Alex Brush', className: 'alex-brush-regular' },
        { value: 'Sacramento', label: 'Sacramento', className: 'sacramento-regular' },
    ];

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (dropdownRef.current && dropdownRef.current !== (event.target as Node) && !(event.target as HTMLElement).classList.contains("fonts-dropdown")) {
    //             setIsOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [setIsOpen]);

    const { currentTextElement } = useFileStore();

    const handleFontSelect = (font: FontOption) => {
        onFontChange(font);
        if (currentTextElement) {
            currentTextElement.classList.add(font.className)
        }
        setIsOpen(false);
    };

    return (
        <div className="font-select select" ref={dropdownRef} onClick={e => e.stopPropagation()}>
            <ul className={`options font-options${isOpen ? "" : " hide"}`}>
                {fontOptions.map((font) => (
                    <li
                        key={font.value}
                        className={`${font.className}${selectedFont?.value === font.value ? " active" : ""}`}
                        onClick={() => handleFontSelect(font)}
                    >
                        {font.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
