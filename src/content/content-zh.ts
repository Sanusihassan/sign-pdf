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
    seoTitle: "签署和编辑PDF - 免费在线PDF编辑器",
    description: "在线添加签名、编辑文本和修改PDF文档",
    color: "#341f97",
    type: ".pdf",
    to: "/sign-pdf",
    features: [
      {
        title: "完全免费且无需注册",
        description: "PDFEquips提供免费的在线PDF签名和编辑服务。无需创建账户或提供电子邮件。"
      },
      {
        title: "易于使用的PDF签名和编辑工具",
        description: "轻松为任何PDF文档添加签名、文本字段、复选框，并编辑现有内容。"
      },
      {
        title: "全面的PDF编辑功能",
        description: "添加签名、文本字段和复选框。涂白不需要的区域，更改字体、颜色和文本样式。"
      }
    ],
    keywords: "签署PDF, 编辑PDF, PDF电子签名, 在线签署PDF, 为PDF添加签名, 免费PDF签名, PDF签名工具, 在线PDF签名, 免费PDF签名, 签署PDF文档, 在线添加签名, 安全PDF签名, PDF文件签名, PDF签名工具, 免费在线PDF签名, 签署多个PDF, 为PDF页面添加签名, 无需注册PDF签名, PDF签名工具, 在线PDF签名, 在线编辑PDF, 向PDF添加文本, 涂白PDF, 更改PDF字体, PDF文本编辑器"
  }
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    sign_pdf: "签署 PDF 选项",
  },
  loader_text: "请稍等...",
  add_more_button: "添加更多文件",
  action_buttons: {
    sign_pdf: "签署 PDF",
  },
  pages: "页",
  page: "页",
  options: {
    signature_row: {
      your_signature: "您的签名",
      add: "添加"
    },
    initials: {
      your_initials: "您的首字母",
      add: "添加"
    },
    additional_text: "附加文本",
    date: "日期",
    checkbox: "复选框",
    whiteout: "涂改液"
  },
  settings_modal: {
    sidebar: {
      draw: "绘制",
      type: "输入",
      upload: "上传",
    },
    input_content: {
      create: "创建"
    }
  }
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

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "条款",
  conditions: "条件",
  privacy_policy: "隐私政策",
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