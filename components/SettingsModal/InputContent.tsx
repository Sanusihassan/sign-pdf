"use client";
import { CiUndo, CiRedo } from "react-icons/ci";
import { v4 as uuid } from 'uuid';
import { FaChevronDown } from "react-icons/fa6";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { DrawingCanvas, DrawingCanvasRef } from "./Canvas/DrawingCanvas";
import { TextInputCanvas } from "./Canvas/TextInputCanvas";
import { UploadCanvas } from "./Canvas/UploadCanvas";
import { useDispatch, useSelector } from "react-redux";
import { setField, signature } from "@/src/store";
import { RootState } from "@/pages/_app";
import { useFileStore } from "@/src/file-store";
import { FontSelect } from "../StyleTools/FontSelect";
import { edit_page, errors } from "@/content";
const MuiColorInput = dynamic(() => import('mui-color-input').then(mod => mod.MuiColorInput), { ssr: false });

export interface FontOption {
    value: string;
    label: string;
    className: string;
}

export const InputContent = ({ layout, errors, content }: { layout?: "draw" | "type" | "upload", errors: errors, content: edit_page["settings_modal"]["input_content"] }) => {
    const [color, setColor] = useState('#341f97');
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const textSignature = useSelector((state: RootState) => state.tool.textSignature);
    const showModalForInitials = useSelector((state: RootState) => state.tool.showModalForInitials);
    const { signatureImages, initialsImage } = useFileStore();

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
        if (drawingRef.current) {
            const svgString = await drawingRef.current.getImage();
            if (showModalForInitials) {
                dispatch(setField({
                    initials: { mark: svgString, font: selectedFont?.className || "", color: color, id: uuid() }
                }));
            } else {

                const newSignature: signature = {
                    mark: svgString,
                    font: selectedFont?.className || "",
                    color: color,
                    id: uuid(),
                };

                dispatch(setField({
                    signatures: [...signatures, newSignature],
                    activeSignatureId: newSignature.id
                }));
            }
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

    const handleCreateClick = async () => {
        if (layout === "draw" && !isCanvasEmpty) {
            await handleCreate();
        }
        else if (layout === "type" && !showModalForInitials) {
            if (textSignature) {
                dispatch(setField({
                    signatures: [...signatures, textSignature],
                    activeSignatureId: textSignature.id
                }));
            }
        }
        dispatch(setField({
            showSignModal: false
        }));
    };

    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

    const initials = useSelector((state: RootState) => state.tool.initials);

    return (
        <div className={`sign-input-content ${layout}`}>
            <header>
                <MuiColorInput format="hex" value={color} onChange={handleChange} className={`color-input${layout == "upload" ? " hide" : ""}`} />
                {/* <Select
                    options={fontOptions}
                    value={selectedFont}
                    onChange={handleFontChange}
                    placeholder="Select Font"
                    className={`font-select${layout == "upload" || layout === "draw" ? " hide" : ""}`}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                /> */}
                <div className={`style-tools${layout == "upload" || layout === "draw" ? " hide" : ""}`}>
                    <div className="fonts-dropdown font-select" onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}>
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
                </div>

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
                        : layout === "type" ? <TextInputCanvas selectedFont={selectedFont} color={color} /> : <UploadCanvas errors={errors} />
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
                    disabled={(layout === "type" &&
                        ((signatures.length || textSignature) == 0 && initials == null)) ||
                        (layout === "upload" && (signatureImages == null && initialsImage == null)) || (layout == "draw" && isCanvasEmpty)}
                >
                    {content.create}
                </button>
            </div>
        </div>
    );
}
