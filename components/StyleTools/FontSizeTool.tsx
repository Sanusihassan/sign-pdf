import { useState, useRef, useEffect } from "react";
import { FontSizeSelect } from "./FontSizeSelect";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useFileStore } from "@/src/file-store";
export const FontSizeTool = () => {
    const [fontSize, setFontSize] = useState(0);
    const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false)
    const decreaseSizeRef = useRef<HTMLButtonElement>(null);
    const increaseSize = useRef<HTMLButtonElement>(null);
    const { currentTextElement } = useFileStore();
    const updateFontSize = (newSize: number) => {
        const clampedSize = Math.min(Math.max(newSize, 6), 144);
        setFontSize(clampedSize);

        if (currentTextElement) {
            const currentFontSize = currentTextElement.style.fontSize;

            if (currentFontSize) {
                // Check if the current font size is set in pt
                const match = currentFontSize.match(/^(\d+(?:\.\d+)?)(pt)$/);
                if (match) {
                    // If it's in pt, maintain the pt unit
                    currentTextElement.style.fontSize = `${clampedSize}pt`;
                } else {
                    // If it's not in pt, or the format is unexpected, use px
                    currentTextElement.style.fontSize = `${clampedSize}px`;
                }
            } else {
                // If fontSize is not set, default to px
                currentTextElement.style.fontSize = `${clampedSize}px`;
            }
        }
    };

    return (
        <div className="font-size-tool">
            <button className="decrease-size" onClick={() => updateFontSize(fontSize - 1)} ref={decreaseSizeRef}>
                <FaMinus />
            </button>
            <div className={`font-size${!fontSize ? " sm" : ""}`} onClick={() => setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen)}>
                {fontSize ? fontSize :
                    <>
                        <FaMinus />
                        <FaMinus />
                    </>
                }
            </div>
            <button className="increase-size" onClick={() => updateFontSize(fontSize + 1)} ref={increaseSize}>
                <FaPlus />
            </button>
            <div className="select">
                <FontSizeSelect isOpen={isFontSizeDropdownOpen} setIsOpen={setIsFontSizeDropdownOpen} fontSize={fontSize} setFontSize={setFontSize} decreaseSizeRef={decreaseSizeRef} increaseSize={increaseSize} />
            </div>
        </div>
    )
}