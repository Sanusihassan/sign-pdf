import { useDispatch } from "react-redux"
import { FontOption } from "../InputContent"
import { setField } from "@/src/store"

type Signature = {
    mark: string;
    font: string;
    color: string;
}

export const TextInputCanvas = ({ selectedFont, color }: {
    selectedFont: FontOption | null,
    color: string
}) => {
    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSignature: Signature = {
            mark: e.target.value,
            font: selectedFont?.className || '',
            color: color
        }

        dispatch(setField({
            signatures: [newSignature]
        }))
    }

    return (
        <div className={`text-input-canvas${selectedFont ? " " + selectedFont.className : ""}`}>
            <input type="text" className="input" autoComplete="off" style={{
                color
            }} onChange={handleInputChange} />
        </div>
    )
}