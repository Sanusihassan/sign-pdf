import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
// store
import { ToolState } from "../../src/store";
import { handleUpload } from "../../src/handlers/handleUpload";
import { handleChange } from "../../src/handlers/handleChange";
import { useFileStore } from "../../src/file-store";
// types
import type { tools } from "../../content";
import { useRouter } from "next/router";
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
      onSubmit={(e) => {
        e.preventDefault();
        console.log(
          JSON.stringify(wrappers)
        )
        // i have this wrappers state variable which is an array of items like this: {"id":1727092938088,"content":{"type":"signature"},"x":419.33331298828125,"y":70.20832061767578,"width":200,"height":100}
        /**
         * and signatures is a list of objects like this:
         type signature = {
          mark: string;
          font: string;
          color: string;
          id: string;
        }
        initials: signature;
        additional_text: string[]
        date: string[]
        checkbox: wrapper[]
         */
        // what i want to send as a payload is 
        // "annotations": [
        //   {
        //     "type": "signature",
        //     "value": "svg string",
        //     "position": { "x": 100, "y": 200, "page": 1 }
        //   },
        //   {
        //     "type": "text",
        //     "value": "John Doe",
        //     "position": { "x": 150, "y": 250, "page": 1 }
        //   },
        //   {
        //     "type": "date",
        //     "value": "2024-09-22",
        //     "position": { "x": 300, "y": 350, "page": 2 }
        //   }
        // ]
        // handleUpload(
        //   e,
        //   downloadBtn,
        //   dispatch,
        //   {
        //     path,
        //     errorMessage,
        //   },
        //   files,
        //   errors,
        //   filesOnSubmit,
        //   setFilesOnSubmit
        // )
      }
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
