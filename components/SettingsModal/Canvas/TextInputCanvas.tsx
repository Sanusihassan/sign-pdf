import { useDispatch } from "react-redux"
import { FontOption } from "../InputContent"
import { setField } from "@/src/store";

export const TextInputCanvas = ({ selectedFont, color }: {
    selectedFont: FontOption | null,
    color: string
}) => {
    const dispatch = useDispatch();
    return (
        <div className={`text-input-canvas${selectedFont ? " " + selectedFont.className : ""}`}>
            <input type="text" className="input" autoComplete="off" style={{
                color
            }} onChange={(e) => {
                dispatch(setField({
                    signature: e.target.value
                }))
            }} />
        </div>
    )
}