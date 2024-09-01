import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/pages/_app";
import { setField, type signature } from "@/src/store";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { Signature } from "./Signature";
import { TextSignature } from "./TextSignature";

export const SignatureDropDown: React.FC<{
    show: boolean;
}> = ({ show }) => {
    const dispatch = useDispatch();
    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const activeSignatureId = useSelector((state: RootState) => state.tool.activeSignatureId);

    const handleSignatureSelect = (signature: signature) => {
        dispatch(setField({ activeSignatureId: signature.id }));
    };

    const handleSignatureDelete = (signatureId: string) => {
        const updatedSignatures = signatures.filter(sig => sig.id !== signatureId);
        const newActiveId = updatedSignatures.length > 0 ? updatedSignatures[0].id : null;
        dispatch(setField({
            signatures: updatedSignatures,
            activeSignatureId: newActiveId
        }));
    };

    const handleAddSignature = () => {
        dispatch(setField({ showSignModal: true }));
    };

    return (
        <div className={`signature-dropdown${show ? "" : " hide"}`} onClick={(e) => e.stopPropagation()}>
            {signatures.map((signature) => (
                <div key={signature.id} className="signature-area">
                    <div
                        className={`signature-area-svg${signature.id === activeSignatureId ? " active" : ""}`}
                        onClick={() => handleSignatureSelect(signature)}
                    >
                        {signature.mark.startsWith("<svg") ?
                            <Signature signatureSVGString={signature.mark} /> :
                            <TextSignature signature={signature} />
                        }
                    </div>
                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSignatureDelete(signature.id);
                        }}
                    >
                        <IoTrashOutline className="icon" />
                    </button>
                </div>
            ))}
            <button className="add-signature main-btn-outlined" onClick={handleAddSignature}>
                <IoIosAddCircleOutline className="icon add-icon" />
                Add Signature
            </button>
        </div>
    );
};