import type {
  tool as _tool,
  web2pdftool as _web2pdftool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../../content";

export const tool: _tool = {
  Sign_PDF: {
    title: "PDF पर हस्ताक्षर करें",
    seoTitle: "PDF पर हस्ताक्षर करें और संपादित करें - मुफ्त ऑनलाइन PDF संपादक",
    description: "ऑनलाइन PDF दस्तावेज़ों में हस्ताक्षर जोड़ें, टेक्स्ट संपादित करें और संशोधित करें",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "पूरी तरह से मुफ्त और बिना पंजीकरण के",
        description: "PDFEquips मुफ्त ऑनलाइन PDF हस्ताक्षर और संपादन सेवा प्रदान करता है। खाता बनाने या ईमेल की आवश्यकता नहीं है।"
      },
      {
        title: "PDF पर हस्ताक्षर करने और संपादित करने का आसान उपकरण",
        description: "किसी भी PDF दस्तावेज़ में आसानी से हस्ताक्षर, टेक्स्ट फ़ील्ड, चेकबॉक्स जोड़ें और मौजूदा सामग्री संपादित करें।"
      },
      {
        title: "व्यापक PDF संपादन सुविधाएँ",
        description: "हस्ताक्षर, टेक्स्ट फ़ील्ड और चेकबॉक्स जोड़ें। अवांछित क्षेत्रों को सफेद करें, फ़ॉन्ट, रंग और टेक्स्ट स्टाइल बदलें।"
      }
    ],
    keywords: "PDF पर हस्ताक्षर करें, PDF संपादित करें, PDF पर ई-हस्ताक्षर करें, ऑनलाइन PDF पर हस्ताक्षर करें, PDF में हस्ताक्षर जोड़ें, मुफ्त PDF हस्ताक्षर, PDF हस्ताक्षर उपकरण, ऑनलाइन PDF हस्ताक्षर, मुफ्त PDF हस्ताक्षर, PDF दस्तावेज़ों पर हस्ताक्षर करें, ऑनलाइन हस्ताक्षर जोड़ें, सुरक्षित PDF हस्ताक्षर, PDF फ़ाइल हस्ताक्षर, PDF हस्ताक्षर उपकरण, मुफ्त ऑनलाइन PDF हस्ताक्षर, कई PDF पर हस्ताक्षर करें, PDF पृष्ठों में हस्ताक्षर जोड़ें, बिना पंजीकरण के PDF पर हस्ताक्षर करें, PDF हस्ताक्षर उपकरण, ऑनलाइन PDF हस्ताक्षर, ऑनलाइन PDF संपादित करें, PDF में टेक्स्ट जोड़ें, PDF को सफेद करें, PDF फ़ॉन्ट बदलें, PDF टेक्स्ट संपादक"
  }
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    sign_pdf: "PDF साइन विकल्प",
  },
  loader_text: "कृपया प्रतीक्षा करें...",
  add_more_button: "अधिक फ़ाइलें जोड़ें",
  action_buttons: {
    sign_pdf: "PDF साइन करें",
  },
  pages: "पृष्ठ",
  page: "पृष्ठ",
  options: {
    signature_row: {
      your_signature: "आपका हस्ताक्षर",
      add: "जोड़ें"
    },
    initials: {
      your_initials: "आपके आद्याक्षर",
      add: "जोड़ें"
    },
    additional_text: "अतिरिक्त पाठ",
    date: "तारीख",
    checkbox: "चेकबॉक्स",
    whiteout: "सफेद पेंट"
  },
  settings_modal: {
    sidebar: {
      draw: "ड्रॉ",
      type: "टाइप",
      upload: "अपलोड",
    },
    input_content: {
      create: "बनाएँ"
    }
  }
};

export const downloadFile: _downloadFile = {
  titles: {
    "sign-pdf": ["PDF फाइलें साइन हो गई हैं!", "PDF फाइल साइन हो गई है!"],
  },

  btnText: {
    "sign-pdf": ["साइन की गई PDF फाइलें डाउनलोड करें", "साइन की गई PDF फाइल डाउनलोड करें"],
  },

  backto: {
    "sign-pdf": "PDF साइन पर वापस जाएं",
  },
};


export const tools: _tools = {
  select: "चुनें",
  or_drop: "या फ़ाइलें यहां छोड़ें",
  files: "फाइलें",
  drop_files: "फ़ाइलें यहाँ खींचें",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "शर्तें",
  conditions: "उपयोग की शर्तें",
  privacy_policy: "गोपनीयता नीति",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "फ़ाइल खाली है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "फ़ाइल बहुत बड़ी है। कृपया एक छोटी फ़ाइल चुनें या फ़ाइल का आकार कम करने के लिए हमारी पीडीएफ़ संपीड़न टूल का उपयोग करें।",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "फ़ाइल एक समर्थित प्रकार की नहीं है।",
    types: {
      PDF: "कृपया एक मान्य पीडीएफ़ फ़ाइल चुनें।",
      IMAGE: "कृपया एक मान्य इमेज फ़ाइल चुनें (JPG, PNG, BMP, TIFF, GIF, SVG, WebP, HEIF)।",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "फ़ाइल भ्रष्ट है और इसे संसाधित नहीं किया जा सकता। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message: "फ़ाइल में कुछ फ़ॉन्ट्स गायब हैं और इसे संसाधित नहीं किया जा सकता। कृपया सुनिश्चित करें कि सभी फ़ॉन्ट्स पीडीएफ़ फ़ाइल में एम्बेडेड हैं।",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "फ़ाइल में अमान्य इमेज डेटा है। कृपया सुनिश्चित करें कि सभी इमेज सही प्रारूप में हैं।",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message: "फ़ाइल में सुरक्षा जोखिम है और इसे संसाधित नहीं किया जा सकता। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message: "आपने अनुमत अधिकतम फ़ाइलों की संख्या पार कर ली है। कृपया कुछ फ़ाइलें हटाएं और पुनः प्रयास करें।",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "कोई फ़ाइलें चयनित नहीं की गई हैं। कृपया कम से कम एक फ़ाइल चुनें।",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "एक अज्ञात त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें या समर्थन से संपर्क करें।",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "नेटवर्क त्रुटि हुई है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    code: "ERR_NETWORK",
  },
};
