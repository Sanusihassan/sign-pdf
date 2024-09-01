import { useDispatch, useSelector } from "react-redux"
import { FontOption } from "../InputContent"
import { setField, signature } from "@/src/store"
import { RootState } from "@/pages/_app";
import { v4 as uuid } from "uuid";

export const TextInputCanvas = ({ selectedFont, color }: {
    selectedFont: FontOption | null,
    color: string
}) => {
    const dispatch = useDispatch();
    const showModalForInitials = useSelector((state: RootState) => state.tool.showModalForInitials);
    const signatures = useSelector((state: RootState) => state.tool.signatures);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSignature: signature = {
            mark: e.target.value,
            font: selectedFont?.className || '',
            color: color,
            id: uuid()
        }
        dispatch(setField({
            textSignature: newSignature
        }));

        if (showModalForInitials) {
            dispatch(setField({
                initials: newSignature
            }));
        }
    }

    return (
        <div className={`text-input-canvas${selectedFont ? " " + selectedFont.className : ""}`}>
            <input type="text"
                className="input"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                style={{
                    color
                }} onChange={handleInputChange} name="text-input-canvas"
                onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                }} />
        </div>
    )
}