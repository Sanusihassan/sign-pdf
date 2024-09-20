import { edit_page, errors } from "@/content";
import { InputContent } from "./InputContent";

export const TextInputSign = ({ errors, content }: { errors: errors, content: edit_page["settings_modal"]["input_content"] }) => {
    return <div className="text-input-sign signing-input">
        <InputContent layout="type" errors={errors} content={content} />
    </div>
}