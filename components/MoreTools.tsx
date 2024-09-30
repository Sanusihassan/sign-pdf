import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { BsTypeStrikethrough } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { RiUnderline } from "react-icons/ri";
import { RxTransparencyGrid } from "react-icons/rx";
import { VscCaseSensitive } from "react-icons/vsc";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useFileStore } from "@/src/file-store";
import { applyStyle } from "@/src/utils";
import { RootState } from "@/pages/_app";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const MoreTools: React.FC = () => {
    const [hideRest, setHideRest] = useState(true);
    const [hideOpacityDropdown, setHideOpacityDropdown] = useState(true);
    const [opacity, setOpacity] = useState<number>(1);
    const moreRef = useRef<HTMLDivElement | null>(null);
    const opacityDropdownRef = useRef<HTMLDivElement | null>(null);
    const [underline, setUnderline] = useState(false);
    const [strikethrough, setStrikethrough] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const activeWrapper = useSelector((state: RootState) => state.tool.activeWrapper);
    const wrappers = useSelector((state: RootState) => state.tool.wrappers);
    const dispatch = useDispatch();
    const handleClickOutside = (event: MouseEvent) => {
        if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
            setHideRest(true);
        }
        if (opacityDropdownRef.current && !opacityDropdownRef.current.contains(event.target as Node)) {
            setHideOpacityDropdown(true);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpacityChange = (value: number | number[]) => {
        if (typeof value === "number") {
            setOpacity(value);
            // Type '"opacity"' has no properties in common with type 'Properties<string | number, string & {}>'.ts(2559)
            applyStyle('opacity', value.toString(), activeWrapper, dispatch, wrappers);
        }
    };

    const handleOpacityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            const clampedValue = Math.min(Math.max(value, 0), 1);
            setOpacity(clampedValue);
            applyStyle('opacity', clampedValue.toString(), activeWrapper, dispatch, wrappers);
        }
    };

    const handleOpacityKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            const newValue = Math.min(opacity + 0.1, 1);
            setOpacity(newValue);
            applyStyle('opacity', newValue.toString(), activeWrapper, dispatch, wrappers);
        } else if (e.key === "ArrowDown") {
            const newValue = Math.max(opacity - 0.1, 0);
            setOpacity(newValue);
            applyStyle('opacity', newValue.toString(), activeWrapper, dispatch, wrappers);
        }
    };

    const toggleStyle = (stateSetter: React.Dispatch<React.SetStateAction<boolean>>, property: keyof CSSProperties, value: string, defaultValue: string) => {
        stateSetter(prev => {
            const newState = !prev;
            applyStyle(property, newState ? value : defaultValue, activeWrapper, dispatch, wrappers);
            return newState;
        });
    };

    return (
        <div className="more" ref={moreRef}>
            <button
                className="indicator"
                onClick={() => {
                    setHideRest(!hideRest);
                }}
            >
                <IoIosMore />
            </button>
            <div className={`rest hide-show ignore${hideRest ? " hide" : " show"}`}>
                <button
                    className={`underline ${underline ? 'active' : ''}`}
                    onClick={() => toggleStyle(setUnderline, 'textDecoration', 'underline', 'none')}
                >
                    <RiUnderline />
                </button>
                <button
                    className={`strikethrough ${strikethrough ? 'active' : ''}`}
                    onClick={() => toggleStyle(setStrikethrough, 'textDecoration', 'line-through', 'none')}
                >
                    <BsTypeStrikethrough />
                </button>
                <button
                    className={`upper-case ${uppercase ? 'active' : ''}`}
                    onClick={() => toggleStyle(setUppercase, 'textTransform', 'uppercase', 'none')}
                >
                    <VscCaseSensitive />
                </button>
                <button className="opacity" onClick={() => setHideOpacityDropdown(!hideOpacityDropdown)}>
                    <RxTransparencyGrid />
                </button>
                <div
                    className={`opacity-tool-dropdown hide-show ignore${hideOpacityDropdown ? " hide" : " show"}`}
                    ref={opacityDropdownRef}
                >
                    <div className="slider-container">
                        <p>Opacity</p>
                        <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={opacity}
                            onChange={handleOpacityChange}
                            className="custom-slider"
                        />
                        <div className="input">
                            <input
                                type="text"
                                value={opacity.toFixed(1)}
                                onChange={handleOpacityInputChange}
                                onKeyDown={handleOpacityKeyUp}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};