import { useState, useEffect } from "react";
export type sharedProps = {
    sharedProps?: {
        ref: React.RefObject<HTMLDivElement>;
        tabIndex: number;
        style?: React.CSSProperties | undefined;
        onFocus: () => void;
        onBlur: () => void;
    }
}

export const Signature = ({ sharedProps, signatureSVGString }: { signatureSVGString: string } & sharedProps) => {
    const [scaledSVG, setScaledSVG] = useState<string | null>(null);
    useEffect(() => {
        if (signatureSVGString) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(signatureSVGString, "image/svg+xml");
            const svgElement = svgDoc.querySelector("svg");

            if (svgElement) {
                // Set a fixed viewBox
                svgElement.setAttribute("viewBox", "0 0 400 256");
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

                // Remove width and height attributes
                svgElement.removeAttribute("width");
                svgElement.removeAttribute("height");

                // Add a unique class to this SVG
                svgElement.setAttribute("class", "signature-svg-content");

                // Add responsive scaling only for this SVG
                const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
                style.textContent = ".signature-svg-content { width: 100%; height: 100%; }";
                svgElement.insertBefore(style, svgElement.firstChild);

                const serializer = new XMLSerializer();
                const scaledSVGString = serializer.serializeToString(svgElement);
                setScaledSVG(scaledSVGString);
            }
        }
    }, [signatureSVGString]);
    return scaledSVG ? <div
        className="signature-svg input"
        dangerouslySetInnerHTML={{ __html: scaledSVG }}
        {...sharedProps}
    /> : null
}