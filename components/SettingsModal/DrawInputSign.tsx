import { edit_page, errors } from "@/content";
import { InputContent } from "./InputContent";

export const DrawInputSign = ({ errors, content }: { errors: errors, content: edit_page["settings_modal"]["input_content"] }) => {
    return <div className="draw-input-sign signing-input">
        <InputContent layout="draw" errors={errors} content={content} />
    </div>
};
