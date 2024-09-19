import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { RootState } from "@/pages/_app";
import { setField } from "@/src/store";
import { enablePointerEvents } from "../Options";
import { SignatureDropDown } from "./SignatureDropDown";
import { PiDotsSixVerticalBold, PiSignature } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { Signature } from "./Signature";
import { TextSignature } from "./TextSignature";

export const SignatureRow: React.FC = () => {
    const dispatch = useDispatch();
    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const activeSignatureId = useSelector((state: RootState) => state.tool.activeSignatureId);
    const showSignatureDropdown = useSelector((state: RootState) => state.tool.showSignatureDropdown);
    const activeSignature = signatures.find(sig => sig.id === activeSignatureId) || null;

    const [{ }, dragSignatureRef] = useDrag(() => ({
        type: "signature",
        item: { type: "signature" },
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
            <div className="signature-drag-el" ref={dragSignatureRef} onClick={() => enablePointerEvents(dispatch)} />
            <PiDotsSixVerticalBold className="icon" />
            {activeSignature ? (
                <>
                    <div className="signature-area-svg">
                        {activeSignature.mark.startsWith("<svg") ?
                            <Signature signatureSVGString={activeSignature.mark} /> :
                            <TextSignature signature={activeSignature} />
                        }
                    </div>
                    <button className="dropdown-toggler" onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setField({ showSignatureDropdown: !showSignatureDropdown }))
                    }}>
                        <FaChevronDown />
                    </button>
                    <SignatureDropDown show={showSignatureDropdown} />
                </>
            ) : (
                <>
                    <PiSignature />
                    <div className="option-label">Your signature</div>
                    <strong className="option-add">Add</strong>
                </>
            )}
        </div>
    );
};