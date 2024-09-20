import { edit_page, errors } from "@/content";
import { InputContent } from "./InputContent";

export const UploadInputSign = ({ errors, content }: { errors: errors, content: edit_page["settings_modal"]["input_content"] }) => {
    return (
        <div className="upload-input-sign signing-input">
            <InputContent layout="upload" errors={errors} content={content} />
        </div>
    )
}