import { _howToSchema } from "./how-to-en";

export const SignPDFHowToSchemaFR: _howToSchema = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  name: "Comment Signer un PDF en Ligne",
  description: "Guide étape par étape pour signer facilement des documents PDF en ligne en utilisant l'outil gratuit de PDFEquips. Ajoutez des signatures, des initiales, du texte et plus à vos fichiers PDF.",
  step: [
    {
      "@type": "HowToStep",
      name: "Ouvrir l'Outil de Signature PDF",
      text: "Accédez à l'outil de Signature PDF sur le site web de PDFEquips.",
      substeps: [
        "Allez sur PDFEquips.com",
        "Trouvez et cliquez sur l'outil 'Signer PDF' dans la section des outils"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Télécharger Votre PDF",
      text: "Téléchargez le fichier PDF que vous souhaitez signer.",
      substeps: [
        "Cliquez sur 'Sélectionner un fichier PDF' ou faites glisser et déposez votre PDF dans la zone désignée",
        "Attendez que le fichier soit téléchargé et traité"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Ajouter Votre Signature",
      text: "Créez ou téléchargez votre signature.",
      substeps: [
        "Cliquez sur l'outil 'Signature'",
        "Choisissez de dessiner votre signature, de télécharger une image ou de taper votre nom",
        "Ajustez la taille et la position de votre signature sur le PDF"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Ajouter des Initiales (Optionnel)",
      text: "Ajoutez vos initiales si nécessaire.",
      substeps: [
        "Cliquez sur l'outil 'Initiales'",
        "Créez vos initiales en utilisant les mêmes méthodes que pour la signature",
        "Placez vos initiales où nécessaire dans le document"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Ajouter du Texte et des Cases à Cocher (Optionnel)",
      text: "Insérez du texte supplémentaire ou des cases à cocher selon les besoins.",
      substeps: [
        "Utilisez l'outil 'Texte' pour ajouter tout texte requis au PDF",
        "Utilisez l'outil 'Case à cocher' pour ajouter des cases à cocher où nécessaire",
        "Ajustez la position et les propriétés des éléments ajoutés"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Masquer les Zones Indésirables (Optionnel)",
      text: "Supprimez ou couvrez les parties indésirables du PDF.",
      substeps: [
        "Utilisez l'outil 'Masquer' pour sélectionner les zones que vous voulez supprimer",
        "Appliquez le masquage pour couvrir les zones sélectionnées"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Signer le PDF",
      text: "Finalisez et signez votre document PDF.",
      substeps: [
        "Vérifiez tous les changements et ajouts que vous avez effectués",
        "Cliquez sur le bouton 'Signer le PDF' pour appliquer tous les changements"
      ]
    },
    {
      "@type": "HowToStep",
      name: "Télécharger le PDF Signé",
      text: "Téléchargez votre fichier PDF signé.",
      substeps: [
        "Cliquez sur le bouton 'Télécharger le fichier PDF signé'",
        "Enregistrez le PDF signé sur votre appareil"
      ]
    }
  ],
};