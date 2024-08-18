import React, { useState, useRef, useEffect } from "react";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const SpacingTool: React.FC = () => {
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [lineSpacing, setLineSpacing] = useState<number>(1);
    const [hideDropdown, setHideDropdown] = useState(true);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLetterSpacingChange = (value: number | number[]) => {
        if (typeof value === "number") {
            setLetterSpacing(value);
        }
    };

    const handleLineSpacingChange = (value: number | number[]) => {
        if (typeof value === "number") {
            setLineSpacing(value);
        }
    };

    const handleLetterSpacingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setLetterSpacing(value);
        }
    };

    const handleLineSpacingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setLineSpacing(value);
        }
    };

    const handleLetterSpacingKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            setLetterSpacing((prev) => Math.min(prev + 1, 800));
        } else if (e.key === "ArrowDown") {
            setLetterSpacing((prev) => Math.max(prev - 1, -200));
        }
    };

    const handleLineSpacingKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            setLineSpacing((prev) => Math.min(prev + 0.1, 2.5));
        } else if (e.key === "ArrowDown") {
            setLineSpacing((prev) => Math.max(prev - 0.1, 0.5));
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setHideDropdown(true);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="spacing-tool-wrapper" ref={dropdownRef}>
            <button
                className="spacing-tool"
                onClick={() => {
                    setHideDropdown(!hideDropdown);
                }}
            >
                <MdOutlineFormatLineSpacing />
            </button>
            <div className={`spacing-tool-dropdown hide-show ignore${hideDropdown ? " hide" : " show"}`}>
                <p>Letter Spacing</p>
                <div className="slider-container">
                    <Slider
                        min={-200}
                        max={800}
                        value={letterSpacing}
                        onChange={handleLetterSpacingChange}
                        className="custom-slider"
                    />
                    <div className="input">
                        <input
                            type="text"
                            value={letterSpacing}
                            onChange={handleLetterSpacingInputChange}
                            onKeyDown={handleLetterSpacingKeyUp}
                        />
                    </div>
                </div>
                <p>Line Spacing</p>
                <div className="slider-container">
                    <Slider
                        min={0.5}
                        max={2.5}
                        step={0.1}
                        value={lineSpacing}
                        onChange={handleLineSpacingChange}
                        className="custom-slider"
                    />
                    <div className="input">
                        <input
                            type="text"
                            value={lineSpacing}
                            onChange={handleLineSpacingInputChange}
                            onKeyDown={handleLineSpacingKeyUp}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
