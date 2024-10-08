import { useState, useRef, useEffect } from "react";
import { FontSizeSelect } from "./FontSizeSelect";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useFileStore } from "@/src/file-store";
import { RootState } from "@/pages/_app";
import { useSelector, useDispatch } from "react-redux";
import { applyStyle } from "@/src/utils";
export const FontSizeTool = () => {
    const [fontSize, setFontSize] = useState(0);
    const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false)
    const decreaseSizeRef = useRef<HTMLButtonElement>(null);
    const increaseSize = useRef<HTMLButtonElement>(null);
    // const { currentTextElement } = useFileStore();
    const activeWrapper = useSelector((state: RootState) => state.tool.activeWrapper);
    const styles = useSelector((state: RootState) => state.tool.styles);
    const dispatch = useDispatch();

    const updateFontSize = (newSize: number) => {
        const clampedSize = Math.min(Math.max(newSize, 6), 144);
        setFontSize(clampedSize);

        if (activeWrapper) {
            const currentFontSize = styles.find(s => s.id === activeWrapper.id)?.fontSize;

            if (currentFontSize) {
                // Check if the current font size is set in pt
                const match = (currentFontSize as string).match(/^(\d+(?:\.\d+)?)(pt)$/);
                if (match) {
                    // If it's in pt, maintain the pt unit
                    applyStyle("fontSize", `${clampedSize}pt`, activeWrapper, dispatch, styles);
                } else {
                    // If it's not in pt, or the format is unexpected, use px
                    applyStyle("fontSize", `${clampedSize}px`, activeWrapper, dispatch, styles);
                }
            } else {
                // If fontSize is not set, default to px
                applyStyle("fontSize", `${clampedSize}px`, activeWrapper, dispatch, styles);
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