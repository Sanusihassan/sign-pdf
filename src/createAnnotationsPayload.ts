// // interface Wrapper {
// //     id: number;
// //     content: {
// //         type: string;
// //     };
// //     x: number;
// //     y: number;
// //     width: number;
// //     height: number;
// // }

// import { WrapperData } from "@/components/DisplayFile/InteractLayer";

// interface Signature {
//     mark: string;
//     font: string;
//     color: string;
//     id: string;
// }

// interface SignatureData {
//     initials: Signature;
//     additional_text: string[];
//     date: string[];
//     checkbox: WrapperData[];
// }

// interface Annotation {
//     type: string;
//     value: string;
//     position: {
//         x: number;
//         y: number;
//         page: number;
//     };
// }

// function createAnnotationsPayload(
//     wrappers: WrapperData[],
//     signatures: SignatureData
// ): Annotation[] {
//     const annotations: Annotation[] = [];

//     wrappers.forEach((wrapper) => {
//         const annotation: Annotation = {
//             type: wrapper.content,
//             value: '', // This will be filled based on the type
//             position: {
//                 x: wrapper.x,
//                 y: wrapper.y,
//                 page: 1, // Assuming all are on page 1, adjust if needed
//             },
//         };

//         switch (wrapper.content.type) {
//             case 'signature':
//                 annotation.value = signatures.initials.mark; // Assuming this is the SVG string
//                 break;
//             case 'text':
//                 annotation.value = signatures.additional_text[0] || ''; // Taking the first additional text
//                 break;
//             case 'date':
//                 annotation.value = signatures.date[0] || ''; // Taking the first date
//                 break;
//             // Add more cases if needed
//         }

//         annotations.push(annotation);
//     });

//     return annotations;
// }

// // Usage
// const wrappers: WrapperData[] = [
//     {
//         id: 1727092938088,
//         content: { type: 'signature' },
//         x: 419.33331298828125,
//         y: 70.20832061767578,
//         width: 200,
//         height: 100,
//         page: 1,
//     },
//     // Add more wrappers as needed
// ];

// const signatures: SignatureData = {
//     initials: {
//         mark: 'svg string',
//         font: 'Arial',
//         color: 'black',
//         id: '1',
//     },
//     additional_text: ['John Doe'],
//     date: ['2024-09-22'],
//     checkbox: [],
// };

// const annotationsPayload = createAnnotationsPayload(wrappers, signatures);
// console.log(JSON.stringify({ annotations: annotationsPayload }, null, 2));