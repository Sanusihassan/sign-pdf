export type howToType = {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  step: {
    "@type": string;
    name: string;
    text: string;
    substeps: string[];
  }[];
};

export type _howToSchema = typeof SignPDFHowToSchema;
export const SignPDFHowToSchema = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  name: "How to Sign a PDF Online",
  description: "Step-by-step guide to easily sign PDF documents online using PDFEquips' free tool. Add signatures, initials, text, and more to your PDF files.",
  step: [
    {
      "@type": "HowToStep",
      name: "Open the Sign PDF Tool",
      text: "Navigate to the Sign PDF tool on PDFEquips website.",
      substeps: [
        "Go to PDFEquips.com",
        "Find and click on the 'Sign PDF' tool in the tools section"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Upload Your PDF",
      text: "Upload the PDF file you want to sign.",
      substeps: [
        "Click 'Select PDF file' or drag and drop your PDF into the designated area",
        "Wait for the file to upload and process"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Add Your Signature",
      text: "Create or upload your signature.",
      substeps: [
        "Click on the 'Signature' tool",
        "Choose to draw your signature, upload an image, or type your name",
        "Adjust the size and position of your signature on the PDF"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Add Initials (Optional)",
      text: "Add your initials if required.",
      substeps: [
        "Click on the 'Initials' tool",
        "Create your initials using the same methods as the signature",
        "Place your initials where needed in the document"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Add Text and Checkboxes (Optional)",
      text: "Insert additional text or checkboxes as needed.",
      substeps: [
        "Use the 'Text' tool to add any required text to the PDF",
        "Use the 'Checkbox' tool to add checkboxes where needed",
        "Adjust the position and properties of added elements"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Whiteout Unwanted Areas (Optional)",
      text: "Remove or cover unwanted parts of the PDF.",
      substeps: [
        "Use the 'Whiteout' tool to select areas you want to remove",
        "Apply the whiteout to cover the selected areas"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Sign the PDF",
      text: "Finalize and sign your PDF document.",
      substeps: [
        "Review all the changes and additions you've made",
        "Click the 'Sign PDF' button to apply all changes"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Download Signed PDF",
      text: "Download your signed PDF file.",
      substeps: [
        "Click on the 'Download Signed PDF file' button",
        "Save the signed PDF to your device"
      ]
    }
  ],
}