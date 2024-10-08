export const tool = {
  Sign_PDF: {
    title: "Sign PDF",
    seoTitle: "Sign & Edit PDFs - Free Online PDF Editor",
    description: "Add signatures, edit text, and modify PDF documents online",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "Completely free and without registration",
        description: "PDFEquips offers a free online PDF signing and editing service. No account creation or email required."
      },
      {
        title: "Easy to use PDF signing and editing tool",
        description: "Easily add signatures, text fields, checkboxes, and edit existing content in any PDF document."
      },
      {
        title: "Comprehensive PDF editing features",
        description: "Add signatures, text fields, and checkboxes. Whiteout unwanted areas, change fonts, colors, and text styles."
      }
    ],
    keywords: "sign PDF, edit PDF, eSign PDF, sign PDF online, add signature to PDF, free PDF sign, PDF signature tool, online PDF signing, PDF sign free, sign PDF documents, add signature online, secure PDF signing, PDF file signature, PDF sign tool, free online PDF signature, sign multiple PDFs, add signature to PDF pages, no registration PDF sign, PDF signing tool, online PDF signature, edit PDF online, add text to PDF, whiteout PDF, change PDF font, PDF text editor"
  }
};

export const tools = {
  select: "Select",
  or_drop: "or drop files here",
  files: "files",
  drop_files: "Drag files here",
};

export const edit_page = {
  edit_page_titles: {
    sign_pdf: "Sign PDF options",
  },
  loader_text: "please wait...",
  add_more_button: "Add more files",
  action_buttons: {
    sign_pdf: "Sign PDF",
  },
  pages: "pages",
  page: "page",
  options: {
    signature_row: {
      your_signature: "Your signature",
      add: "Add"
    },
    initials: {
      your_initials: "Your initials",
      add: "Add"
    },
    additional_text: "Additional text",
    date: "Date",
    checkbox: "Checkbox",
    whiteout: "whiteout",
  },
  settings_modal: {
    sidebar: {
      draw: "Draw",
      type: "Type",
      upload: "Upload",
    },
    input_content: {
      create: "Create"
    }
  }
};

export const downloadFile = {
  titles: {
    "sign-pdf": ["PDF files have been signed!", "PDF file has been signed!"],
  },

  btnText: {
    "sign-pdf": ["Download Signed PDF files", "Download Signed PDF file"],
  },

  backto: {
    "sign-pdf": "Back To Sign PDF",
  },
};

export const footer = {
  brand: "PDFEquips",
  terms: "terms",
  conditions: "conditions",
  privacy_policy: "privacy policy",
};

export const errors = {
  EMPTY_FILE: {
    message: "The file is empty. Please choose a valid file.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "The file is too large. Please choose a smaller file, or use our compress-pdf tool to reduce the file size.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "The file is not a supported type.",
    types: {
      PDF: "Please choose a valid PDF file.",
      IMAGE: "Please choose a valid image file (JPG, PNG, BMP, TIFF, GIF, SVG, WebP, HEIF).",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "The file is corrupt and cannot be processed. Please choose a valid file.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "The file contains missing fonts and cannot be processed. Please ensure all fonts are embedded in the PDF file.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "The file contains invalid image data. Please ensure all images are properly formatted.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "The file contains a security risk and cannot be processed. Please choose a valid file.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "You have exceeded the maximum number of files allowed. Please delete some files and try again.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No files selected. Please select at least one file.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "An unknown error occurred. Please try again later or contact support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "A network error occurred. Please check your internet connection and try again.",
    code: "ERR_NETWORK",
  },
};
