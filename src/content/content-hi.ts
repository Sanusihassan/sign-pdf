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
    title: "PDF साइन करें",
    seoTitle: "ऑनलाइन PDF साइन करें - मुफ्त PDF सिग्नेचर टूल",
    description: "ऑनलाइन PDF दस्तावेज़ों पर अपना हस्ताक्षर जोड़ें",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "पूरी तरह से मुफ्त और बिना पंजीकरण",
        description: "PDFEquips एक मुफ्त ऑनलाइन PDF हस्ताक्षर सेवा प्रदान करता है। खाता बनाने की आवश्यकता नहीं है, और हम कभी भी आपका ईमेल पता या क्रेडिट कार्ड की जानकारी नहीं मांगते हैं।"
      },
      {
        title: "आसानी से उपयोग में आने वाला PDF साइनिंग टूल",
        description: "PDFEquips किसी भी PDF दस्तावेज़, चाहे वह अनुबंध हो, फॉर्म हो या कोई अन्य दस्तावेज़ हो, सभी प्रारूपों के साथ संगत हस्ताक्षर जोड़ने में आसान बनाता है।"
      },
      {
        title: "PDF फ़ाइलों को ऑनलाइन सुरक्षित रूप से साइन करें",
        description: "सुरक्षा कारणों से TLS का उपयोग करके हमारे सर्वर पर अपलोड और बनाए गए सभी फ़ाइलें एन्क्रिप्ट की जाती हैं। उन्हें प्रोसेसिंग के बाद तुरंत और स्थायी रूप से हटा दिया जाएगा। अधिक जानकारी के लिए, कृपया हमारी गोपनीयता नीति देखें।"
      }
    ],
    keywords: "PDF साइन करें, ऑनलाइन PDF साइन करें, PDF में हस्ताक्षर जोड़ें, मुफ्त PDF साइन करें, PDF सिग्नेचर टूल, ऑनलाइन PDF साइनिंग, मुफ्त PDF साइन करें, PDF दस्तावेज़ों को साइन करें, ऑनलाइन हस्ताक्षर जोड़ें, सुरक्षित PDF साइनिंग, PDF फ़ाइल सिग्नेचर, PDF साइन टूल, मुफ्त ऑनलाइन PDF सिग्नेचर, कई PDFs साइन करें, PDF पेजों में हस्ताक्षर जोड़ें, बिना पंजीकरण PDF साइन करें, PDF साइनिंग टूल, ऑनलाइन PDF सिग्नेचर"
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
