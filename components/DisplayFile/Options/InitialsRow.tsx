import { RootState } from "@/pages/_app";
import { setField } from "@/src/store";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Signature } from "./Signature";
import { TextSignature } from "./TextSignature";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { useFileStore } from "@/src/file-store";
import { edit_page } from "@/content";

export const InitialsRow = ({ content }: { content: edit_page["options"]["initials"] }) => {
    const dispatch = useDispatch();
    const initials = useSelector((state: RootState) => state.tool.initials);
    const { initialsImage } = useFileStore();
    const [{ isDragging: isDraggingInitials }, dragInitialsRef] = useDrag(() => ({
        type: "initials",
        item: { type: "initials", initials },
        collect: (monitor) => {
            dispatch(setField({ acceptPointerEvents: true }));
            return ({
                isDragging: !!monitor.isDragging(),
            })
        },
    }));
    useEffect(() => {

    }, [initials]);
    return (
        <div className="option-row initials-row" onClick={() => {
            dispatch(setField({
                showSignModal: true
            }));

            dispatch(setField({
                showModalForInitials: true
            }));
        }}>
            <div className={`initials-drag-el${initials === null ? " hide" : ""}`} ref={dragInitialsRef} onClick={e => {
                e.stopPropagation();
                dispatch(setField({ acceptPointerEvents: true }));
            }} />
            <PiDotsSixVerticalBold className="icon" />
            {initials ?
                (
                    <div className="initials">
                        {
                            initials?.mark.startsWith("<svg") ?
                                <Signature signatureSVGString={initials.mark} />
                                : <TextSignature signature={initials} />
                        }
                        <button className="delete-btn" onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                                setField({
                                    initials: null
                                })
                            )
                        }}>
                            <IoTrashOutline className="icon" />
                        </button>
                    </div>
                ) :
                <>
                    {initialsImage ?
                        <img src={URL.createObjectURL(initialsImage)} ref={dragInitialsRef} /> :
                        <>
                            <div className="option-label">{content.your_initials}</div>
                            <strong className="option-add">{content.add}</strong>
                        </>
                    }
                </>
            }
        </div>
    )
}