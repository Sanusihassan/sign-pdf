import type { errors } from "@/content";
import { useFileStore } from "@/src/file-store";
import FileCard from "./FileCard";
export const Files = ({
  errors,
  loader_text,
  fileDetailProps,
  extension,
}: {
  errors: errors;
  loader_text: string;
  fileDetailProps: [string, string, string];
  extension: string;
}) => {
  const { files } = useFileStore();
  return (
    <>
      <FileCard
        file={files[0]}
        errors={errors}
        loader_text={loader_text}
        fileDetailProps={fileDetailProps}
        extension={extension}
      />
    </>
  );
};
