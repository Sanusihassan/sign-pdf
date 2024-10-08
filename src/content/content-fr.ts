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
    title: "Signer PDF",
    seoTitle: "Signer et Éditer des PDF - Éditeur PDF Gratuit en Ligne",
    description: "Ajoutez des signatures, éditez du texte et modifiez des documents PDF en ligne",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "Totalement gratuit et sans inscription",
        description: "PDFEquips propose un service gratuit de signature et d'édition de PDF en ligne. Aucune création de compte ni adresse e-mail requise."
      },
      {
        title: "Outil facile à utiliser pour signer et éditer des PDF",
        description: "Ajoutez facilement des signatures, des champs de texte, des cases à cocher et modifiez le contenu existant dans n'importe quel document PDF."
      },
      {
        title: "Fonctionnalités complètes d'édition de PDF",
        description: "Ajoutez des signatures, des champs de texte et des cases à cocher. Blanchissez les zones indésirables, changez les polices, les couleurs et les styles de texte."
      }
    ],
    keywords: "signer PDF, éditer PDF, signature électronique PDF, signer PDF en ligne, ajouter signature à PDF, signature PDF gratuite, outil de signature PDF, signature PDF en ligne, signer PDF gratuitement, signer documents PDF, ajouter signature en ligne, signature PDF sécurisée, signature fichier PDF, outil signature PDF, signature PDF gratuite en ligne, signer plusieurs PDF, ajouter signature aux pages PDF, signer PDF sans inscription, outil de signature PDF, signature PDF en ligne, éditer PDF en ligne, ajouter texte à PDF, blanchir PDF, changer police PDF, éditeur de texte PDF"
  }
};


export const tools: _tools = {
  select: "Sélectionner",
  or_drop: "ou déposer des fichiers ici",
  files: "fichiers",
  drop_files: "Déposez les fichiers ici",
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    sign_pdf: "Options de signature PDF",
  },
  loader_text: "veuillez patienter...",
  add_more_button: "Ajouter plus de fichiers",
  action_buttons: {
    sign_pdf: "Signer PDF",
  },
  pages: "pages",
  page: "page",
  options: {
    signature_row: {
      your_signature: "Votre signature",
      add: "Ajouter"
    },
    initials: {
      your_initials: "Vos initiales",
      add: "Ajouter"
    },
    additional_text: "Texte supplémentaire",
    date: "Date",
    checkbox: "Case à cocher",
    whiteout: "correcteur"
  },
  settings_modal: {
    sidebar: {
      draw: "Dessiner",
      type: "Taper",
      upload: "Télécharger",
    },
    input_content: {
      create: "Créer"
    }
  }
};


export const downloadFile: _downloadFile = {
  titles: {
    "sign-pdf": ["Les fichiers PDF ont été signés !", "Le fichier PDF a été signé !"],
  },

  btnText: {
    "sign-pdf": ["Télécharger les fichiers PDF signés", "Télécharger le fichier PDF signé"],
  },

  backto: {
    "sign-pdf": "Retour à Signer PDF",
  },
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "conditions",
  conditions: "conditions d'utilisation",
  privacy_policy: "politique de confidentialité",
};


export const errors: _errors = {
  EMPTY_FILE: {
    message: "Le fichier est vide. Veuillez choisir un fichier valide.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "Le fichier est trop volumineux. Veuillez choisir un fichier plus petit ou utiliser notre outil de compression de PDF pour réduire la taille du fichier.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "Le fichier n'est pas d'un type pris en charge.",
    types: {
      PDF: "Veuillez choisir un fichier PDF valide.",
      IMAGE: "Veuillez choisir un fichier image valide (JPG, PNG, BMP, TIFF, GIF, SVG, WebP, HEIF).",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "Le fichier est corrompu et ne peut pas être traité. Veuillez choisir un fichier valide.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message: "Le fichier contient des polices manquantes et ne peut pas être traité. Veuillez vous assurer que toutes les polices sont intégrées dans le fichier PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "Le fichier contient des données d'image non valides. Veuillez vous assurer que toutes les images sont correctement formatées.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message: "Le fichier présente un risque de sécurité et ne peut pas être traité. Veuillez choisir un fichier valide.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message: "Vous avez dépassé le nombre maximum de fichiers autorisés. Veuillez supprimer certains fichiers et réessayer.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "Aucun fichier sélectionné. Veuillez sélectionner au moins un fichier.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "Une erreur inconnue s'est produite. Veuillez réessayer plus tard ou contacter le support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "Une erreur réseau s'est produite. Veuillez vérifier votre connexion internet et réessayer.",
    code: "ERR_NETWORK",
  },
};
