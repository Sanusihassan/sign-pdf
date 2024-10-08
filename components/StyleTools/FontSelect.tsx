import { RootState } from '@/pages/_app';
import { applyStyle } from '@/src/utils';
import React, { useRef, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const activeWrapper = useSelector((state: RootState) => state.tool.activeWrapper);
    const styles = useSelector((state: RootState) => state.tool.styles);

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

    // const { currentTextElement } = useFileStore();
    const dispatch = useDispatch();

    const handleFontSelect = (font: FontOption) => {
        onFontChange(font);
        applyStyle("fontFamily", font.value, activeWrapper, dispatch, styles);
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
