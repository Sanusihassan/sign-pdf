import { errors } from "@/content";
import { InputContent } from "./InputContent";

export const DrawInputSign = ({ errors }: { errors: errors }) => {
    return <div className="draw-input-sign signing-input">
        <InputContent layout="draw" errors={errors} />
    </div>
};
