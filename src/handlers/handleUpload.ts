import axios from "axios";
import { Dispatch, RefObject } from "react";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../../content";
import { AnyAction } from "@reduxjs/toolkit";
import {
  resetErrorMessage,
  setField,
  ToolState
} from "../store";

export const handleUpload = async (
  e: React.FormEvent<HTMLFormElement>,
  downloadBtn: RefObject<HTMLAnchorElement>,
  dispatch: Dispatch<AnyAction>,
  state: {
    path: string;
    errorMessage: string;
    annotations: ToolState["wrappers"],
    signatures: ToolState["signatures"],
    initials: ToolState["initials"],
    styles: ToolState["styles"],
  },
  files: File[],
  errors: _,
  filesOnSubmit: string[],
  setFilesOnSubmit: (value: string[]) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));
  console.log(JSON.stringify(state));
  // console.log(JSON.stringify(state.signatures));
  // return;
  if (!files) return;
  // Extract file names from the File[] array
  const fileNames = files.map((file) => file.name);

  // Check if every file name in files is present in filesOnSubmit
  const allFilesPresent = fileNames.every((fileName) =>
    filesOnSubmit.includes(fileName)
  );

  // if (allFilesPresent && files.length === filesOnSubmit.length) {
  //   dispatch(setField({ showDownloadBtn: true }));
  //   dispatch(resetErrorMessage());
  //   return;
  // }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("annotations", JSON.stringify(state.annotations));
  formData.append("signatures", JSON.stringify(state.signatures));
  formData.append("initials", JSON.stringify(state.initials));
  formData.append("styles", JSON.stringify(state.styles));
  let url;
  if (process.env.NODE_ENV === "development") {
    url = `https://studious-carnival-w45wppxwvrh5647-4001.app.github.dev/api/${state.path}`;
  } else {
    url = `/api/${state.path}`;
  }
  // if (state.errorMessage) {
  //   return;
  // }
  const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");

  const mimeTypeLookupTable: {
    [key: string]: { outputFileMimeType: string; outputFileName: string };
  } = {
    "application/zip": {
      outputFileMimeType: "application/zip",
      outputFileName: `PDFEquips-${state.path}.zip`,
    },
    "application/pdf": {
      outputFileMimeType: "application/pdf",
      outputFileName: `${originalFileName}.pdf`,
    }
  };

  try {
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
    });
    // const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");
    const mimeType = response.data.type || response.headers["content-type"];
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };
    const { outputFileMimeType, outputFileName } = mimeTypeData;

    dispatch(setField({ showDownloadBtn: true }));
    downloadConvertedFile(
      response,
      outputFileMimeType,
      outputFileName,
      downloadBtn
    );
    setFilesOnSubmit(files.map(f => f.name));

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      dispatch(resetErrorMessage());
      dispatch(setField({ isSubmitted: false }));
    }
  } catch (error) {
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      return;
    }
    dispatch(setField({ isSubmitted: false }));
  } finally {
    dispatch(setField({ isSubmitted: false }));
  }
};
