import { FaChevronDown, FaItalic, FaBold } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { AlignmentTool } from "./StyleTools/AlignmentTool";
import { BiFont } from "react-icons/bi";
import { MoreTools } from "./MoreTools";
import { RootState } from "@/pages/_app";
const MuiColorInput = dynamic(() => import('mui-color-input').then(mod => mod.MuiColorInput), { ssr: false });
import { useState } from "react";
import dynamic from "next/dynamic";
import { FontOption, FontSelect } from "./StyleTools/FontSelect";
import { FontSizeTool } from "./StyleTools/FontSizeTool";
import { SpacingTool } from "./StyleTools/SpacingTool";
import { useFileStore } from "@/src/file-store";

export const StyleTools = () => {
    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    const [color, setColor] = useState('#0000');
    type Tool = "Bold" | "Color" | "Italic" | "More";
    const [activeTools, setActiveTools] = useState<Tool[]>([]);

    const handleChange = (newValue: string) => {
        setColor(newValue);
        if (!activeTools.includes("Color")) {
            setActiveTools([...activeTools, "Color"]);
        }
        if (currentTextElement) {
            currentTextElement.style.color = color;
        }
    };

    const toggleTool = (tool: Tool) => {
        if (activeTools.includes(tool)) {
            setActiveTools(activeTools.filter(t => t !== tool));
        } else {
            setActiveTools([...activeTools, tool]);
        }
    };


    const [selectedFont, setSelectedFont] = useState<FontOption | null>(null);
    const handleFontChange = (selectedOption: FontOption | null) => {
        setSelectedFont(selectedOption);
    };
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

    const { currentTextElement } = useFileStore();
    return (
        <div className={`style-tools${showStyleTools ? "" : " clear"}`}>
            <div className="fonts-dropdown" onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}>
                <div
                    className={`selected-font ${selectedFont?.className}`}
                    style={{ fontFamily: selectedFont ? selectedFont.value : 'inherit' }}
                >
                    {selectedFont ? selectedFont.label : 'Select Font'}
                </div>
                <FaChevronDown />
                <FontSelect
                    selectedFont={selectedFont}
                    onFontChange={handleFontChange}
                    isOpen={isFontDropdownOpen}
                    setIsOpen={setIsFontDropdownOpen}
                />
            </div>
            <FontSizeTool />
            <div
                className={`text-color-tool${activeTools.includes("Color") ? " active" : ""}`}
                onClick={() => toggleTool("Color")}
            >
                <BiFont />
                <div className="color-picker">
                    <MuiColorInput format="hex" value={color} onChange={handleChange} className={`color-input`} />
                </div>
            </div>
            <div
                className={`bold-tool${activeTools.includes("Bold") ? " active" : ""}`}
                onClick={() => {
                    toggleTool("Bold");
                    if (currentTextElement) {
                        if (!activeTools.includes("Bold")) {
                            currentTextElement.style.fontWeight = "bold";
                        }
                        else {
                            currentTextElement.style.fontWeight = "normal";
                        }
                    }
                }}
            >
                <FaBold />
            </div>
            <div
                className={`italic-tool${activeTools.includes("Italic") ? " active" : ""}`}
                onClick={() => {
                    toggleTool("Italic");
                    if (currentTextElement) {
                        if (!activeTools.includes("Italic")) {
                            currentTextElement.style.fontStyle = "italic"
                        }
                        else {
                            currentTextElement.style.fontStyle = "normal";
                        }
                    }
                }}
            >
                <FaItalic />
            </div>
            <div className="alignment-tool">
                <AlignmentTool />
            </div>
            <SpacingTool />
            <div
                className={`more-tools${activeTools.includes("More") ? " active" : ""}`}
                onClick={() => toggleTool("More")}
            >
                <MoreTools />
            </div>
        </div>
    )
}