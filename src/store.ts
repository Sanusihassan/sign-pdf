import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;

export type signature = {
  mark: string;
  font: string;
  color: string;
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
  showSignModal: boolean;
  signatureSVGString: string;
  showStyleTools: boolean;
  acceptPointerEvents: boolean;
  initials: string;
  showModalForInitials: boolean;
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
  showSignModal: false,
  signatureSVGString: "",
  showStyleTools: false,
  acceptPointerEvents: true,
  showModalForInitials: false,
  initials: ""
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
        // Cast the key to keyof ToolState to ensure it's a valid key
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

export const {
  resetErrorMessage,
  setField
} = toolSlice.actions;

export default toolSlice.reducer;