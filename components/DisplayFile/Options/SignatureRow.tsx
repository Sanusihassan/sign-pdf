import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { RootState } from "@/pages/_app";
import { setField, signature } from "@/src/store";
import { enablePointerEvents } from "../Options";
import { SignatureDropDown } from "./SignatureDropDown";
import { PiDotsSixVerticalBold, PiSignature } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { Signature } from "./Signature";
import { TextSignature } from "./TextSignature";
import { edit_page } from "@/content";


export const SignatureRow = ({ content }: {
    content: edit_page["options"]["signature_row"]
}) => {
    const dispatch = useDispatch();
    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const activeSignatureId = useSelector((state: RootState) => state.tool.activeSignatureId);
    const showSignatureDropdown = useSelector((state: RootState) => state.tool.showSignatureDropdown);
    // const wrappers = useSelector((state: RootState) => state.tool.wrappers);
    useEffect(() => {
    }, []);
    const activeSignature = signatures.find(sig => sig.id === activeSignatureId) || signatures[0];
    const [{ }, dragSignatureRef] = useDrag(() => ({
        type: "signature",
        item: { type: "signature", id: activeSignature?.id },
        canDrag: !!activeSignature,
        collect: (monitor) => {
            enablePointerEvents(dispatch);
            return ({
                isDragging: !!monitor.isDragging(),
            })
        },
    }), [activeSignature]);

    const handleAddSignature = () => {
        dispatch(setField({
            showSignModal: true,
            showModalForInitials: false
        }));
    };

    return (
        <div className={`option-row${showSignatureDropdown ? " dropdown-visible" : ""}`} onClick={handleAddSignature}>
            <div className="signature-drag-el" ref={dragSignatureRef} onClickCapture={(e) => {
                enablePointerEvents(dispatch);
            }} />
            <PiDotsSixVerticalBold className="icon" />
            {activeSignature ? (
                <>
                    <div className="signature-area-svg" onClick={e => {
                        if (signatures.length !== 0) {
                            e.stopPropagation();
                            // dispatch(setField({
                            //     wrappers: [...wrappers, newWrapper]
                            // }))
                            // dispatch(setField({
                            //     insertActiveSignatureToCurrentPage: {
                            //         insert: true,
                            //         type: "signature"
                            //     }
                            // }));
                        }
                    }}>
                        {activeSignature !== null && activeSignature?.mark.startsWith("<svg") ?
                            <Signature signatureSVGString={activeSignature.mark} /> :
                            activeSignature?.mark.startsWith('data:image/') ?
                                <img src={activeSignature.mark} alt={`Signature ${activeSignature}`} className="sig-img" />
                                :
                                <TextSignature signature={activeSignature as signature} />
                        }
                    </div>
                    <button className="dropdown-toggler" onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setField({ showSignatureDropdown: !showSignatureDropdown }))
                    }}>
                        <FaChevronDown />
                    </button>
                    <SignatureDropDown />
                </>
            ) : (
                <>
                    <PiSignature />
                    <div className="option-label">{content.your_signature}</div>
                    <strong className="option-add">{content.add}</strong>
                </>
            )}
        </div>
    );
};