import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/pages/_app";
import { setField, type signature } from "@/src/store";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { Signature } from "./Signature";
import { TextSignature } from "./TextSignature";
import { useFileStore } from "@/src/file-store";

export const SignatureDropDown = () => {
    const dispatch = useDispatch();
    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const activeSignatureId = useSelector((state: RootState) => state.tool.activeSignatureId);
    const showSignatureDropdown = useSelector((state: RootState) => state.tool.showSignatureDropdown);
    const { signatureImages, setSignatureImages } = useFileStore();
    useEffect(() => {
    }, [signatureImages, showSignatureDropdown])

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
        <div className={`signature-dropdown${showSignatureDropdown ? "" : " hide"}`} onClick={(e) => e.stopPropagation()}>
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
            {signatureImages ? signatureImages.map((sig, id) => (
                <div className="signature-area">
                    <div className={`signature-area-svg${String(id) === activeSignatureId ? " active" : ""}`} onClick={() => {
                        dispatch(setField({ activeSignatureId: id }));
                    }}>
                        <div className="signature-svg">
                            <img key={id} src={URL.createObjectURL(sig)} alt={`Signature ${id}`} className="responsive-image no-drag" />
                        </div>
                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Update the state to remove the selected signature
                                const updatedSignatures = signatureImages.filter((_, index) => index !== id);
                                setSignatureImages(updatedSignatures);
                            }}
                        >
                            <IoTrashOutline className="icon" />
                        </button>
                    </div>
                </div>
            )) : null}

            <button className="add-signature main-btn-outlined" onClick={handleAddSignature}>
                <IoIosAddCircleOutline className="icon add-icon" />
                Add Signature
            </button>
        </div>
    );
};