import "react-tooltip/dist/react-tooltip.css";
import type { errors as _, edit_page } from "../content";
import { Files } from "./DisplayFile/Files";
type propTypes = {
  extension: string;
  pages: string;
  page: string;
  lang: string;
  errors: _;
  edit_page: edit_page;
};

const DisplayFile = ({
  extension,
  pages,
  page,
  lang,
  errors,
  edit_page,
}: propTypes) => {
  return (
    <div className="display-file">
      <Files
        errors={errors}
        extension={extension}
        loader_text={edit_page.loader_text}
        fileDetailProps={[pages, page, lang]}
      />
    </div>
  );
};

export default DisplayFile;
