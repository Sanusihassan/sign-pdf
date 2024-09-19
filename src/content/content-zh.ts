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
    title: "签署PDF",
    seoTitle: "在线签署PDF - 免费PDF签名工具",
    description: "在线为PDF文件添加签名",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "完全免费且无需注册",
        description: "PDFEquips 提供免费的在线 PDF 签名服务。无需创建账户，我们从不要求提供您的电子邮件地址或信用卡信息。"
      },
      {
        title: "易于使用的PDF签名工具",
        description: "PDFEquips 让您可以轻松地在任何 PDF 文件上添加签名，无论是合同、表格还是其他文件，所有格式都兼容。"
      },
      {
        title: "在线安全签署PDF文件",
        description: "您上传和在我们服务器上创建的所有文件都使用TLS进行加密以确保安全。处理后将立即永久删除。有关更多信息，请参阅我们的隐私政策。"
      }
    ],
    keywords: "签署PDF, 在线签署PDF, 添加签名到PDF, 免费签署PDF, PDF签名工具, 在线PDF签名, 免费PDF签名, 签署PDF文件, 在线添加签名, 安全签署PDF, PDF文件签名, PDF签名工具, 免费在线PDF签名, 签署多个PDF, 添加签名到PDF页面, 无需注册签署PDF, PDF签名工具, 在线PDF签名"
  }
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    sign_pdf: "签署 PDF 选项",
  },
  loader_text: "请稍候...",
  add_more_button: "添加更多文件",
  action_buttons: {
    sign_pdf: "签署 PDF",
  },
  pages: "页",
  page: "页",
};

export const downloadFile: _downloadFile = {
  titles: {
    "sign-pdf": ["PDF 文件已签署！", "PDF 文件已签署！"],
  },

  btnText: {
    "sign-pdf": ["下载已签署的 PDF 文件", "下载已签署的 PDF 文件"],
  },

  backto: {
    "sign-pdf": "返回签署 PDF",
  },
};

export const tools: _tools = {
  select: "选择",
  or_drop: "或将文件拖放到此处",
  files: "文件",
  drop_files: "在此处拖放文件",
};


export const errors: _errors = {
  EMPTY_FILE: {
    message: "文件为空。请选择有效的文件。",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "文件太大。请选择较小的文件，或使用我们的 PDF 压缩工具来减少文件大小。",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "文件类型不受支持。",
    types: {
      PDF: "请选择有效的 PDF 文件。",
      IMAGE: "请选择有效的图片文件 (JPG, PNG, BMP, TIFF, GIF, SVG, WebP, HEIF)。",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "文件已损坏，无法处理。请选择有效的文件。",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "文件中缺少字体，无法处理。请确保所有字体都嵌入到 PDF 文件中。",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "文件包含无效的图片数据。请确保所有图片格式正确。",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message: "文件存在安全风险，无法处理。请选择有效的文件。",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message: "您已超过允许的最大文件数量。请删除一些文件并重试。",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "未选择任何文件。请至少选择一个文件。",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "发生未知错误。请稍后再试或联系支持。",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "发生网络错误。请检查您的互联网连接并重试。",
    code: "ERR_NETWORK",
  },
};