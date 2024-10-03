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
    title: "Firmar PDF",
    seoTitle: "Firmar PDFs en línea - Herramienta de firma PDF gratuita",
    description: "Añade tu firma a documentos PDF en línea",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "Completamente gratis y sin registro",
        description: "PDFEquips ofrece un servicio de firma de PDF en línea gratuito. No es necesario crear una cuenta, y nunca pedimos tu dirección de correo electrónico ni información de tu tarjeta de crédito."
      },
      {
        title: "Herramienta de firma de PDF fácil de usar",
        description: "PDFEquips facilita añadir tu firma a cualquier documento PDF, ya sea un contrato, formulario u otro documento, todos los formatos son compatibles."
      },
      {
        title: "Firma archivos PDF en línea de manera segura",
        description: "Todos los archivos que cargas y creas en nuestros servidores están encriptados por razones de seguridad usando TLS. Serán eliminados de inmediato y de manera permanente después de su procesamiento. Para más información, consulta nuestra política de privacidad."
      }
    ],
    keywords: "firmar PDF, firmar PDF en línea, añadir firma a PDF, firmar PDF gratis, herramienta de firma PDF, firma PDF en línea, firmar PDF gratis, firmar documentos PDF, añadir firma en línea, firma PDF segura, firma de archivos PDF, herramienta de firma PDF, firma PDF en línea gratuita, firmar múltiples PDFs, añadir firma a páginas PDF, firmar PDF sin registro, herramienta de firma PDF, firma PDF en línea"
  }
};

export const tools: _tools = {
  select: "Seleccionar",
  or_drop: "o soltar archivos aquí",
  files: "archivos",
  drop_files: "Arrastra los archivos aquí",
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    sign_pdf: "Opciones de Firmar PDF",
  },
  loader_text: "por favor espera...",
  add_more_button: "Agregar más archivos",
  action_buttons: {
    sign_pdf: "Firmar PDF",
  },
  pages: "páginas",
  page: "página",
  options: {
    signature_row: {
      your_signature: "Tu firma",
      add: "Agregar"
    },
    initials: {
      your_initials: "Tus iniciales",
      add: "Agregar"
    },
    additional_text: "Texto adicional",
    date: "Fecha",
    checkbox: "Casilla de verificación",
    whiteout: "corrección"
  },
  settings_modal: {
    sidebar: {
      draw: "Dibujar",
      type: "Escribir",
      upload: "Subir",
    },
    input_content: {
      create: "Crear"
    }
  }
};

export const downloadFile: _downloadFile = {
  titles: {
    "sign-pdf": ["¡Los archivos PDF han sido firmados!", "¡El archivo PDF ha sido firmado!"],
  },

  btnText: {
    "sign-pdf": ["Descargar archivos PDF firmados", "Descargar archivo PDF firmado"],
  },

  backto: {
    "sign-pdf": "Volver a Firmar PDF",
  },
};


export const errors: _errors = {
  EMPTY_FILE: {
    message: "El archivo está vacío. Por favor, elija un archivo válido.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "El archivo es demasiado grande. Por favor, elija un archivo más pequeño o use nuestra herramienta de compresión de PDF para reducir el tamaño del archivo.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "El archivo no es de un tipo admitido.",
    types: {
      PDF: "Por favor, elija un archivo PDF válido.",
      IMAGE: "Por favor, elija un archivo de imagen válido (JPG, PNG, BMP, TIFF, GIF, SVG, WebP, HEIF).",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "El archivo está dañado y no se puede procesar. Por favor, elija un archivo válido.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message: "El archivo contiene fuentes faltantes y no se puede procesar. Por favor, asegúrese de que todas las fuentes estén incrustadas en el archivo PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "El archivo contiene datos de imagen no válidos. Por favor, asegúrese de que todas las imágenes tengan el formato correcto.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message: "El archivo contiene un riesgo de seguridad y no se puede procesar. Por favor, elija un archivo válido.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message: "Ha excedido el número máximo de archivos permitidos. Por favor, elimine algunos archivos y vuelva a intentarlo.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No se han seleccionado archivos. Por favor, seleccione al menos un archivo.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "Ocurrió un error desconocido. Por favor, inténtelo más tarde o contacte con soporte.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "Ocurrió un error de red. Por favor, verifique su conexión a internet y vuelva a intentarlo.",
    code: "ERR_NETWORK",
  },
};
