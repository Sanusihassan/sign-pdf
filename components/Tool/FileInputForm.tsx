import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
// store
import { ToolState } from "../../src/store";
import { handleUpload } from "../../src/handlers/handleUpload";
import { handleChange } from "../../src/handlers/handleChange";
import { useFileStore } from "../../src/file-store";
// types
import type { tools } from "../../content";
import { validateFiles } from "../../src/utils";
import { RootState } from "@/pages/_app";
type AcceptedFileTypes = {
  [key in ".pdf" | ".pptx" | ".docx" | ".xlsx" | ".jpg" | ".html"]: string;
};
interface FileInputFormProps {
  data: {
    type: string;
    to: string;
  };
  acceptedFileTypes: AcceptedFileTypes;
  errors: any;
  lang: string;
  tools: tools;
}
export const FileInputForm: React.FC<FileInputFormProps> = ({
  data,
  acceptedFileTypes,
  errors,
  lang,
  tools,
}) => {
  const path = data.to.replace("/", "")
  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  const wrappers = useSelector((state: RootState) => state.tool.wrappers);
  const signatures = useSelector((state: RootState) => state.tool.signatures);
  const initials = useSelector((state: RootState) => state.tool.initials);
  const styles = useSelector((state: RootState) => state.tool.styles);
  const dispatch = useDispatch();
  // file store
  const {
    files,
    setFiles,
    setFileInput,
    setDownloadBtn,
    setSubmitBtn,
    filesOnSubmit,
    setFilesOnSubmit,
  } = useFileStore();
  // refs
  const fileInput = useRef<HTMLInputElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const downloadBtn = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setFileInput(fileInput);
    setSubmitBtn(submitBtn);
    setDownloadBtn(downloadBtn);
  }, []);
  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
      // {"id":1727092938088,"content":{"type":"signature"},"x":419.33331298828125,"y":70.20832061767578,"width":200,"height":100}
      onSubmit={(e) =>
        handleUpload(
          e,
          downloadBtn,
          dispatch,
          {
            path,
            errorMessage,
            annotations: wrappers,
            signatures,
            initials,
            styles
          },
          files,
          errors,
          filesOnSubmit,
          setFilesOnSubmit
        )
      }
      method="POST"
      encType="multipart/form-data"
    >
      <div
        className={`upload-btn btn btn-lg text-white position-relative overflow-hidden ${path}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="button"
      >
        {lang == "ar" ? (
          <bdi>
            {tools.select} {tools.files}
            <span className="text-uppercase">
              {data.type.replace(".", "")}
            </span>{" "}
          </bdi>
        ) : (
          <bdi>
            {tools.select}{" "}
            <span className="text-uppercase">{data.type.replace(".", "")}</span>{" "}
            {tools.files}
          </bdi>
        )}
        <input
          type="file"
          name="files"
          accept={
            acceptedFileTypes[data.type as keyof typeof acceptedFileTypes]
          }
          multiple={path !== "split-pdf" && path !== "pdf-to-pdf-a"}
          ref={fileInput}
          className="position-absolute file-input"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            handleChange(e, dispatch, setFiles, data.type, errors, files, {
              path,
            });
          }}
        />
      </div>
      <a
        href=""
        className="d-none"
        ref={downloadBtn}
        download="__output.pdf"
      ></a>
      {/* <div className="my-4">
          </div> */}
      <button type="submit" ref={submitBtn} className="d-none">
        submit
      </button>
    </form>
  );
};
