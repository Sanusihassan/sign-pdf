import { _howToSchema } from "./how-to-en";

export const SignPDFHowToSchemaES: _howToSchema = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  name: "Cómo Firmar un PDF en Línea",
  description: "Guía paso a paso para firmar fácilmente documentos PDF en línea utilizando la herramienta gratuita de PDFEquips. Añade firmas, iniciales, texto y más a tus archivos PDF.",
  step: [
    {
      "@type": "HowToStep",
      name: "Abrir la Herramienta de Firma PDF",
      text: "Navega hasta la herramienta de Firma PDF en el sitio web de PDFEquips.",
      substeps: [
        "Ve a PDFEquips.com",
        "Encuentra y haz clic en la herramienta 'Firmar PDF' en la sección de herramientas"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Subir tu PDF",
      text: "Sube el archivo PDF que deseas firmar.",
      substeps: [
        "Haz clic en 'Seleccionar archivo PDF' o arrastra y suelta tu PDF en el área designada",
        "Espera a que el archivo se suba y procese"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Añadir tu Firma",
      text: "Crea o sube tu firma.",
      substeps: [
        "Haz clic en la herramienta 'Firma'",
        "Elige dibujar tu firma, subir una imagen o escribir tu nombre",
        "Ajusta el tamaño y la posición de tu firma en el PDF"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Añadir Iniciales (Opcional)",
      text: "Añade tus iniciales si es necesario.",
      substeps: [
        "Haz clic en la herramienta 'Iniciales'",
        "Crea tus iniciales usando los mismos métodos que para la firma",
        "Coloca tus iniciales donde sea necesario en el documento"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Añadir Texto y Casillas de Verificación (Opcional)",
      text: "Inserta texto adicional o casillas de verificación según sea necesario.",
      substeps: [
        "Usa la herramienta 'Texto' para añadir cualquier texto requerido al PDF",
        "Usa la herramienta 'Casilla de verificación' para añadir casillas donde sea necesario",
        "Ajusta la posición y propiedades de los elementos añadidos"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Blanquear Áreas no Deseadas (Opcional)",
      text: "Elimina o cubre partes no deseadas del PDF.",
      substeps: [
        "Usa la herramienta 'Blanquear' para seleccionar las áreas que quieres eliminar",
        "Aplica el blanqueado para cubrir las áreas seleccionadas"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Firmar el PDF",
      text: "Finaliza y firma tu documento PDF.",
      substeps: [
        "Revisa todos los cambios y adiciones que has hecho",
        "Haz clic en el botón 'Firmar PDF' para aplicar todos los cambios"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Descargar el PDF Firmado",
      text: "Descarga tu archivo PDF firmado.",
      substeps: [
        "Haz clic en el botón 'Descargar archivo PDF firmado'",
        "Guarda el PDF firmado en tu dispositivo"
      ]
    }
  ],
};