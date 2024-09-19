import { errors } from "@/content";
import { InputContent } from "./InputContent";

export const UploadInputSign = ({ errors }: { errors: errors }) => {
    return (
        <div className="upload-input-sign signing-input">
            <InputContent layout="upload" errors={errors} />
        </div>
    )
}