import { useDispatch, useSelector } from "react-redux"
import { FontOption } from "../InputContent"
import { setField } from "@/src/store"
import { RootState } from "@/pages/_app";

type Signature = {
    mark: string;
    font: string;
    color: string;
}

export const TextInputCanvas = ({ selectedFont, color }: {
    selectedFont: FontOption | null,
    color: string
}) => {
    const dispatch = useDispatch();
    const showModalForInitials = useSelector((state: RootState) => state.tool.showModalForInitials);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSignature: Signature = {
            mark: e.target.value,
            font: selectedFont?.className || '',
            color: color
        }

        if (showModalForInitials) {
            dispatch(setField({
                initials: newSignature
            }));
        } else {
            dispatch(setField({
                signatures: [newSignature]
            }));
        }
    }

    return (
        <div className={`text-input-canvas${selectedFont ? " " + selectedFont.className : ""}`}>
            <input type="text" className="input" autoComplete="off" style={{
                color
            }} onChange={handleInputChange} />
        </div>
    )
}