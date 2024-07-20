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
  add_more_button: "अधिक फाइलें जोड़ें",
  action_buttons: {
    sign_pdf: "PDF साइन करें",
  },
  pages: "पृष्ठ",
  page: "पृष्ठ",
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
      "फ़ाइल बहुत बड़ी है। कृपया एक छोटी फ़ाइल चुनें या हमारा कंप्रेस-पीडीएफ़ उपकरण उपयोग करके फ़ाइल का आकार कम करें।",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "फ़ाइल एक समर्थित प्रकार नहीं है।",
    types: {
      PDF: "कृपया एक मान्य पीडीएफ़फ़ाइल चुनें।",
      JPG: "कृपया एक मान्य जेपेग छवि फ़ाइल चुनें।",
      DOC: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      DOCX: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      XLS: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      XLSX: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      PPT: "कृपया एक मान्यपावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
      PPTX: "कृपया एक मान्य पावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "फ़ाइल का डाटा भ्रष्ट है और इसे प्रसंस्करण नहीं किया जा सकता है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "फ़ाइल में फ़ॉन्ट गुम हैं। कृपया सुनिश्चित करें कि पीडीएफफ़ाइल में सभी फ़ॉन्ट एम्बेड हैं।",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "फ़ाइल में अवैध छवि डेटा है। कृपया सुनिश्चित करें कि सभी छवियाँ सही ढंग से फ़ॉर्मेटेड हैं।",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "फ़ाइल में सुरक्षा जोखिम हो सकता है और इसे प्रसंस्करण नहीं किया जा सकता है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "आपने अनुमति दी हुई अधिकतम फ़ाइलों की संख्या पार कर दी है। कृपया कुछ फ़ाइलें हटाएं और पुनः प्रयास करें।",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "कोई फ़ाइल चयनित नहीं की गई है। कृपया कम से कम एक फ़ाइल चुनें।",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "एक अज्ञात त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें या सहायता से संपर्क करें।",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "नेटवर्क में त्रुटि हो गई है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    code: "ERR_NETWORK",
  },

  ERR_UPLOAD_COUNT: {
    message: "कृपया फ्यूजन करने के लिए कम से कम दो फ़ाइलें अपलोड करें।",
    code: "ERR_UPLOAD_COUNT",
  },
};
