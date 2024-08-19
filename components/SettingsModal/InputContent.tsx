// i want to isolate hte select font to it's own component:
"use client";
import { CiUndo, CiRedo } from "react-icons/ci";

import Select from 'react-select';
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { DrawingCanvas, DrawingCanvasRef } from "./Canvas/DrawingCanvas";
import { TextInputCanvas } from "./Canvas/TextInputCanvas";
import { UploadCanvas } from "./Canvas/UploadCanvas";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/src/store";
import { RootState } from "@/pages/_app";
import { useFileStore } from "@/src/file-store";
const MuiColorInput = dynamic(() => import('mui-color-input').then(mod => mod.MuiColorInput), { ssr: false });

export interface FontOption {
    value: string;
    label: string;
    className: string;
}

export const InputContent = ({ layout }: { layout?: "draw" | "type" | "upload" }) => {
    const [color, setColor] = useState('#341f97');
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

    const signature = useSelector((state: RootState) => state.tool.signature);
    const { uploadedImage } = useFileStore();

    const dispatch = useDispatch();

    const handleChange = (newValue: string) => {
        setColor(newValue);
    };

    const drawingRef = useRef<DrawingCanvasRef>(null);

    const handleUndo = () => {
        if (drawingRef.current) {
            drawingRef.current.undo();
        }
    };

    const handleRedo = () => {
        if (drawingRef.current) {
            drawingRef.current.redo();
        }
    };

    const handleCreate = async () => {
        console.log('Executing handleCreate');
        if (drawingRef.current) {
            const svgString = await drawingRef.current.getImage();

            dispatch(setField({
                signatureSVGString: svgString
            }))

            // Create a Blob from the SVG string
            // const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        }
    };


    const handleEmptyStateChange = (isEmpty: boolean) => {
        setIsCanvasEmpty(isEmpty);
    };

    const fontOptions: FontOption[] = [
        { value: 'Cedarville Cursive', label: 'Cedarville Cursive', className: 'cedarville-cursive-regular' },
        { value: 'Arizonia', label: 'Arizonia', className: 'arizonia-regular' },
        { value: 'Lobster', label: 'Lobster', className: 'lobster-regular' },
        { value: 'Rouge Script', label: 'Rouge Script', className: 'rouge-script-regular' },
        { value: 'Alex Brush', label: 'Alex Brush', className: 'alex-brush-regular' },
        { value: 'Sacramento', label: 'Sacramento', className: 'sacramento-regular' },
    ];

    const [selectedFont, setSelectedFont] = useState<FontOption | null>(fontOptions[0]);

    const handleFontChange = (selectedOption: FontOption | null) => {
        setSelectedFont(selectedOption);
    };

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            className: state.data.className,
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            fontFamily: state.data.value,
        }),
        control: (provided: any) => ({
            ...provided,
            fontFamily: selectedFont ? selectedFont.value : 'inherit',
        }),
    };

    const formatOptionLabel = ({ label, className }: FontOption) => (
        <div className={className}>{label}</div>
    );

    const handleCreateClick = async () => {
        if (layout === "draw" && !isCanvasEmpty) {
            await handleCreate();
        }
        // Add logic for other layouts if needed
        dispatch(setField({
            showSignModal: false
        }));
    };

    return (
        <div className={`sign-input-content ${layout}`}>
            <header>
                <MuiColorInput format="hex" value={color} onChange={handleChange} className={`color-input${layout == "upload" ? " hide" : ""}`} />
                <Select
                    options={fontOptions}
                    value={selectedFont}
                    onChange={handleFontChange}
                    placeholder="Select Font"
                    className={`font-select${layout == "upload" || layout === "draw" ? " hide" : ""}`}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                />

                <div className={`history-controls${layout == "upload" ? " hide" : ""}`}>
                    <button className="history-btn" onClick={handleUndo}>
                        <CiUndo />
                    </button>
                    <button className="history-btn" onClick={handleRedo}>
                        <CiRedo />
                    </button>
                </div>
            </header>
            <div className="main">
                {
                    layout === "draw" ? <DrawingCanvas color={color} ref={drawingRef} onEmptyStateChange={handleEmptyStateChange} />
                        : layout === "type" ? <TextInputCanvas selectedFont={selectedFont} color={color} /> : <UploadCanvas />
                }
            </div>
            <div className="footer">
                <button className="footer-btn main-btn-outlined" onClick={() => {
                    dispatch(setField({
                        showSignModal: false
                    }));
                    if (!isCanvasEmpty) {
                        (async () => {
                            await handleCreate();
                        })()
                    }
                }}>Cancel</button>
                <button
                    className="footer-btn main-btn"
                    onClick={handleCreateClick}
                    disabled={(layout === "type" && signature == "") || (layout === "upload" && uploadedImage == null) || (layout == "draw" && isCanvasEmpty)}
                >
                    Create
                </button>
            </div>
        </div>
    );
}
