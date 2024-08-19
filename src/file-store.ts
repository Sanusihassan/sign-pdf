import { Dispatch, RefObject, SetStateAction } from "react";
import { create } from "zustand";

export interface FileStore {
  files: File[];
  fileInput: RefObject<HTMLInputElement> | null;
  submitBtn: React.RefObject<HTMLButtonElement> | null;
  downloadBtn: React.RefObject<HTMLAnchorElement> | null;
  currentTextElement: HTMLElement | null;
  filesOnSubmit: string[];
  uploadedImage: File | null;
  imageUrls: {
    file: File;
    imageUrl: string;
  }[];
  setFiles: (files: FileList | File[]) => void;
  setUploadedImage: (file: File | null) => void;
  setFileInput: (refEl: RefObject<HTMLInputElement> | null) => void;
  setSubmitBtn: (refEl: React.RefObject<HTMLButtonElement> | null) => void;
  setDownloadBtn: (refEl: React.RefObject<HTMLAnchorElement> | null) => void;
  setImageUrls: Dispatch<
    SetStateAction<
      {
        file: File;
        imageUrl: string;
      }[]
    >
  >;
  setFilesOnSubmit(value: string[]): void;
  setCurrentTextElement(el: HTMLElement | null): void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  fileInput: null,
  downloadBtn: null,
  submitBtn: null,
  imageUrls: [],
  filesOnSubmit: [],
  uploadedImage: null,
  currentTextElement: null,
  setFiles: (files: FileList | File[]) => {
    const uniqueFiles = new Set<File>();

    if (files instanceof FileList) {
      Array.from(files).forEach((file) => uniqueFiles.add(file));
    } else {
      files.forEach((file) => uniqueFiles.add(file));
    }

    set({ files: Array.from(uniqueFiles) });
  },
  setFileInput(refEl: RefObject<HTMLInputElement> | null) {
    set({ fileInput: refEl });
  },
  setSubmitBtn(refEl: React.RefObject<HTMLButtonElement> | null) {
    set({ submitBtn: refEl });
  },
  setDownloadBtn(refEl: React.RefObject<HTMLAnchorElement> | null) {
    set({ downloadBtn: refEl });
  },
  setImageUrls(value: SetStateAction<{ file: File; imageUrl: string }[]>) {
    set((prevState) => ({
      imageUrls:
        typeof value === "function" ? value(prevState.imageUrls) : value,
    }));
  },
  setFilesOnSubmit(value: string[]) {
    set({ filesOnSubmit: value });
  },
  setUploadedImage(file) {
    set({
      uploadedImage: file
    })
  },
  setCurrentTextElement(el) {
    set({
      currentTextElement: el
    })
  },
}));
