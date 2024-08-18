import { useState, useRef, useEffect } from "react";
import { BsTypeStrikethrough } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { RiUnderline } from "react-icons/ri";
import { RxTransparencyGrid } from "react-icons/rx";
import { VscCaseSensitive } from "react-icons/vsc";

export const MoreTools = () => {
    const [hideRest, setHideRest] = useState(true);
    const moreRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
            setHideRest(true);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                <button className="underline">
                    <RiUnderline />
                </button>
                <button className="strikethrough">
                    <BsTypeStrikethrough />
                </button>
                <button className="upper-case">
                    <VscCaseSensitive />
                </button>
                <button className="opacity">
                    <RxTransparencyGrid />
                </button>
            </div>
        </div>
    );
};
