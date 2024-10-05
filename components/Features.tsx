import { useSelector } from "react-redux";
import type { ToolState } from "@/src/store";
import { MdMoneyOff } from "react-icons/md";
import EasyIcon from "./icons/EasyIcon";
import ComprehensiveIcon from "./icons/Comprehensive";


export const Features = ({
  features,
}: {
  features: { title: string; description: string }[];
}) => {
  const stateShowTool = useSelector(
    (state: { tool: ToolState }) => state.tool.showTool
  );
  const icons = [MdMoneyOff, EasyIcon, ComprehensiveIcon]
  return (
    <div className={`features${stateShowTool ? "" : " d-none"}`}>
      {features.map(({ title, description }, i) => {
        const Icon = icons[i];
        return (
          <div className="feature">
            <Icon className={`feature-icon no-fill`} />
            <div className="title">{title}</div>
            <p className="description">{description}</p>
          </div>
        );
      })}
    </div>
  );
};
