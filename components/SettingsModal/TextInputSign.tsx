import { errors } from "@/content";
import { InputContent } from "./InputContent";

export const TextInputSign = ({ errors }: { errors: errors }) => {
    return <div className="text-input-sign signing-input">
        <InputContent layout="type" errors={errors} />
    </div>
}