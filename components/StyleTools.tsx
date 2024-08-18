import { FaMinus, FaPlus, FaChevronDown, FaItalic, FaBold } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import { AlignmentTool } from "./StyleTools/AlignmentTool"
import { BiFont } from "react-icons/bi"
import { ListTool } from "./StyleTools/ListTool"
import { SpacingTool } from "./StyleTools/SpacingTool"
import { setField } from "@/src/store"
import { MoreTools } from "./MoreTools"
import { RootState } from "@/pages/_app"

export const StyleTools = () => {
    const dispatch = useDispatch();
    const showStyleTools = useSelector((state: RootState) => state.tool.showStyleTools);
    return (
        <div className={`style-tools${showStyleTools ? "" : " clear"}`}>
            <div className="fonts-dropdown">
                Multiple Fonts
                <FaChevronDown />
            </div>
            <div className="font-size-tool">
                <button className="decrease-size">
                    <FaMinus />
                </button>
                <div className="font-size">
                    <FaMinus />
                    <FaMinus />
                </div>
                <button className="increase-size">
                    <FaPlus />
                </button>
            </div>
            <div className="text-color-tool">
                <BiFont />
            </div>
            <div className="bold-tool">
                <FaBold />
            </div>
            <div className="italic-tool">
                <FaItalic />
            </div>
            <AlignmentTool />
            {/* <ListTool /> */}
            {/* <SpacingTool /> */}
            <MoreTools />
        </div>
    )
}