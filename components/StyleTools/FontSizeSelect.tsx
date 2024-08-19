import { useFileStore } from "@/src/file-store";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

interface FontSizeSelectProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    decreaseSizeRef: RefObject<HTMLButtonElement>,
    increaseSize: RefObject<HTMLButtonElement>
}

export const FontSizeSelect: React.FC<FontSizeSelectProps> = ({ isOpen, setIsOpen, fontSize, setFontSize, decreaseSizeRef, increaseSize }) => {
    const dropdownRef = useRef<HTMLUListElement>(null);

    const fontSizes = [
        6, 8, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 96, 104, 120, 144
    ];

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (dropdownRef.current && dropdownRef.current !== target && (!dropdownRef.current.contains(target)) && !target.classList.contains("font-size") ||
            (
                decreaseSizeRef.current?.contains(target) || increaseSize.current?.contains(target)
            )
        ) {
            setIsOpen(false);
        }
    };
    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);


    const handleFontSizeSelect = (size: number) => {
        setFontSize(size);
        if (currentTextElement) {
            currentTextElement.style.fontSize = `${size}pt`;
        }
        setIsOpen(false);
    };

    const { currentTextElement } = useFileStore();

    return (
        <ul className={`font-size-options options${isOpen ? "" : " hide"}`} ref={dropdownRef} onClick={e => e.stopPropagation()}>
            {fontSizes.map(size => (
                <li
                    key={size}
                    className={`big-padding${fontSize === size ? " active" : ""}`}
                    onClick={() => handleFontSizeSelect(size)}
                >
                    {size} pt
                </li>
            ))}
        </ul>
    );
};
