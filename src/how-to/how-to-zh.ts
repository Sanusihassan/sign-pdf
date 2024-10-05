import { _howToSchema } from "./how-to-en";

export const SignPDFHowToSchemaZH: _howToSchema = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  name: "如何在线签署PDF文件",
  description: "使用PDFEquips免费工具轻松在线签署PDF文档的分步指南。为您的PDF文件添加签名、姓名首字母、文本等。",
  step: [
    {
      "@type": "HowToStep",
      name: "打开PDF签名工具",
      text: "导航到PDFEquips网站上的PDF签名工具。",
      substeps: [
        "访问PDFEquips.com",
        `在工具部分找到并点击"签署PDF"工具`
      ]
    },
    {
      "@type": "HowToStep",
      name: "上传您的PDF",
      text: "上传您想要签署的PDF文件。",
      substeps: [
        `点击"选择PDF文件"或将您的PDF拖放到指定区域`,
        "等待文件上传和处理"
      ]
    },
    {
      "@type": "HowToStep",
      name: "添加您的签名",
      text: "创建或上传您的签名。",
      substeps: [
        `点击"签名"工具`,
        "选择绘制签名、上传图像或输入您的姓名",
        "调整签名在PDF上的大小和位置"
      ]
    },
    {
      "@type": "HowToStep",
      name: "添加姓名首字母（可选）",
      text: "如果需要，添加您的姓名首字母。",
      substeps: [
        `点击"首字母"工具`,
        "使用与签名相同的方法创建您的姓名首字母",
        "将姓名首字母放置在文档中需要的位置"
      ]
    },
    {
      "@type": "HowToStep",
      name: "添加文本和复选框（可选）",
      text: "根据需要插入额外的文本或复选框。",
      substeps: [
        `使用"文本"工具向PDF添加所需的任何文本`,
        `使用"复选框"工具在需要的地方添加复选框`,
        "调整添加的元素的位置和属性"
      ]
    },
    {
      "@type": "HowToStep",
      name: "擦除不需要的区域（可选）",
      text: "移除或覆盖PDF中不需要的部分。",
      substeps: [
        `使用"擦除"工具选择您想要移除的区域`,
        "应用擦除来覆盖选定的区域"
      ]
    },
    {
      "@type": "HowToStep",
      name: "签署PDF",
      text: "完成并签署您的PDF文档。",
      substeps: [
        "审查您所做的所有更改和添加",
        `点击"签署PDF"按钮应用所有更改`
      ]
    },
    {
      "@type": "HowToStep",
      name: "下载已签署的PDF",
      text: "下载您已签署的PDF文件。",
      substeps: [
        `点击"下载已签署的PDF文件"按钮`,
        "将已签署的PDF保存到您的设备上"
      ]
    }
  ],
};