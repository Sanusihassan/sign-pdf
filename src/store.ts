import { drop_type, WrapperData } from "@/components/DisplayFile/InteractLayer";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;

export type signature = {
  mark: string;
  font: string;
  color: string;
  id: string;
}

export interface ToolState {
  showTool: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  errorCode: string | null;
  showDownloadBtn: boolean;
  showOptions: boolean;
  nav_height: number;
  pageCount: number;
  signatures: signature[];
  activeSignatureId: string | null | number;
  showSignModal: boolean;
  showStyleTools: boolean;
  acceptPointerEvents: boolean;
  initials: signature | null;
  showModalForInitials: boolean;
  textSignature: signature | null,
  showSignatureDropdown: boolean;
  wrappers: WrapperData[];
  additionalTextFields: WrapperData[];
  datesFields: WrapperData[];
  insertActiveSignatureToCurrentPage: {
    insert: boolean;
    type: drop_type | null
  };
  checkboxes: WrapperData[];
  activeWrapper: WrapperData | null
}

const initialState: ToolState = {
  showTool: true,
  errorMessage: "",
  showErrorMessage: false,
  isSubmitted: false,
  errorCode: null,
  showDownloadBtn: false,
  showOptions: false,
  nav_height: 0,
  pageCount: 0,
  signatures: [],
  activeSignatureId: null,
  showSignModal: false,
  showStyleTools: false,
  acceptPointerEvents: true,
  showModalForInitials: false,
  initials: null,
  textSignature: null,
  showSignatureDropdown: false,
  wrappers: [],
  additionalTextFields: [],
  datesFields: [],
  checkboxes: [],
  insertActiveSignatureToCurrentPage: {
    insert: false,
    type: null
  },
  activeWrapper: null
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.showErrorMessage = false;
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setField(state, action: PayloadAction<Partial<ToolState>>) {
      Object.keys(action.payload).forEach((key) => {
        const typedKey = key as k;
        const value = action.payload[typedKey];
        if (value !== undefined) {
          // @ts-ignore
          state[typedKey] = value;
        }
      });
    },
  },
});

export const { resetErrorMessage, setField } = toolSlice.actions;

export default toolSlice.reducer;