/**
 * i want to send the data like this:
 * {
  "annotations": [
    {
      "type": "signature",
      "value": "svg string",
      "position": { "x": 100, "y": 200, "page": 1 }
    },
    {
      "type": "text",
      "value": "John Doe",
      "position": { "x": 150, "y": 250, "page": 1 }
    },
    {
      "type": "date",
      "value": "2024-09-22",
      "position": { "x": 300, "y": 350, "page": 2 }
    }
  ]
}

 */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import interact from "interactjs";
import { Controls } from "./Controls";
import { useFileStore } from "@/src/file-store";
import { IoIosCheckboxOutline } from "react-icons/io";
import { RootState } from "@/pages/_app";
import { useSelector } from "react-redux";
import { Signature } from "../DisplayFile/Options/Signature";
import { TextSignature } from "../DisplayFile/Options/TextSignature";
import { setField, signature } from "@/src/store";
import { drop_type, WrapperData } from "../DisplayFile/InteractLayer";
import { useDispatch } from "react-redux";
export type content_type = {
  type: drop_type;
  id?: string;
} | string;
interface WrapperProps {
  id: string;
  initialContent:
  content_type;
  wrapper: WrapperData;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onContentChange: (id: string, content: string) => void;
  onFocus?: () => void;
  onInput?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Wrapper: React.FC<WrapperProps> = ({
  id,
  initialContent,
  className,
  wrapper,
  style,
  onDuplicate,
  onDelete,
  onMove,
  onResize,
  onContentChange,
  onFocus,
  onInput,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [controlsPosition, setControlsPosition] = useState<"top" | "bottom">(
    "top"
  );
  const { setCurrentTextElement } = useFileStore();
  const dispatch = useDispatch();
  const { x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight, style: textElstyle } = wrapper;
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.style.transform = `translate(${initialX}px, ${initialY}px)`;
      wrapper.style.width = `${initialWidth}px`;
      wrapper.style.height = `${initialHeight}px`;
      wrapper.setAttribute("data-x", initialX.toString());
      wrapper.setAttribute("data-y", initialY.toString());

      interact(wrapper)
        .draggable({
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: "parent",
              endOnly: false,
            }),
          ],
          listeners: {
            move: dragMoveListener,
            end: (event) => {
              const target = event.target;
              const x = parseFloat(target.getAttribute("data-x") || "0");
              const y = parseFloat(target.getAttribute("data-y") || "0");
              onMove(id, x, y);
            },
          },
        })
        .resizable({
          edges: { top: true, left: true, bottom: true, right: true },
          listeners: {
            move: resizeMoveListener,
            end: (event) => {
              const target = event.target;
              const width = parseFloat(target.style.width);
              const height = parseFloat(target.style.height);
              onResize(id, width, height);
            },
          },
          modifiers: [
            interact.modifiers.restrictEdges({
              outer: "parent",
            }),
            interact.modifiers.restrictSize({
              min: { width: 50, height: 20 },
            }),
          ],
        });
    }
    setClearOutline(showControls ||
      initialContent == "type something..." ||
      initialContent === "")
  }, [id, initialX, initialY, initialWidth, initialHeight, onMove, onResize]);

  const updateControlPosition = () => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      const parentRect = wrapper.parentElement!.getBoundingClientRect();

      if (rect.top - parentRect.top < 40) {
        setControlsPosition("bottom");
      } else {
        setControlsPosition("top");
      }
    }
  };

  const dragMoveListener = (event: any) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    updateControlPosition();
  };

  const resizeMoveListener = (event: any) => {
    const target = event.target;
    let x = parseFloat(target.getAttribute("data-x")) || 0;
    let y = parseFloat(target.getAttribute("data-y")) || 0;

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    updateControlPosition();
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    onContentChange(id, e.currentTarget.textContent || "");
    if (onInput) {
      onInput();
    }
  };

  const [showControls, setShowControls] = useState(true);
  const [clearOutline, setClearOutline] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const controlsElement = document.querySelector(".controls");
    if (controlsElement?.contains(e.target as Node)) {
      setShowControls(true);
    }
  };
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (
        inputRef.current.textContent === "" &&
        typeof initialContent === "string"
      ) {
        inputRef.current.textContent = initialContent;
      }
    }
  }, [inputRef.current]);

  useEffect(() => {
    // Set the initial signature when the component mounts
    if (typeof initialContent !== "string" && initialContent.type === "signature" && signatures.length > 0) {
      const selectedSignature = signatures.find(sig => sig.id === activeSignatureId);
      setWrapperSignature(selectedSignature || signatures[0]);
    } else if (typeof initialContent !== "string" && initialContent.type === "initials") {
      setWrapperSignature(initials);
    }
  }, []);

  const [editable, setEditable] = useState(false);
  const signatures = useSelector((state: RootState) => state.tool.signatures);
  const initials = useSelector((state: RootState) => state.tool.initials);
  const activeSignatureId = useSelector((state: RootState) => state.tool.activeSignatureId);
  const sharedProps = {
    tabIndex: 0,
    ref: inputRef,
    onFocus: () => {
      setShowControls(true);
      setEditable(true);
      if (onFocus) {
        onFocus();
      }
      setCurrentTextElement(inputRef.current);
      dispatch(setField({
        activeWrapper: wrapper
      }))
    },
    onBlur: () => {
      setShowControls(false);
      setEditable(false);
    },
  };

  const SVGSharedProps = {
    tabIndex: 0,
    ref: inputRef,
    onFocus: () => {
      setShowControls(true);
    },
    onBlur: () => {
      setShowControls(false);
    },
  };

  const [wrapperSignature, setWrapperSignature] = useState<signature | null>(null);

  // const renderContent = () => {
  //   if (typeof initialContent === "string") {
  //     return (
  //       <div
  //         className={`input${className ? " " + className : ""}`}
  //         contentEditable={editable}
  //         suppressContentEditableWarning
  //         onInput={handleContentChange}
  //         {...sharedProps}
  //       />
  //     );
  //   } else if (initialContent.type === "checkbox") {
  //     return (
  //       <IoIosCheckboxOutline
  //         className="icon input"
  //         style={style}
  //         {...sharedProps}
  //       />
  //     );
  //   } else if (initialContent.type === "signature") {
  //     if (wrapperSignature && wrapperSignature.mark.includes("<svg")) {
  //       return <Signature sharedProps={SVGSharedProps} signatureSVGString={wrapperSignature.mark} />;
  //     } else if (typeof activeSignatureId === "number" && signatureImages && signatureImages[activeSignatureId]) {
  //       return (
  //         <img
  //           src={URL.createObjectURL(signatureImages[activeSignatureId])}
  //           alt="Signature"
  //           className="w-100 h-100"
  //         />
  //       );
  //     } else {
  //       return <TextSignature sharedProps={sharedProps} signature={wrapperSignature} />
  //     }
  //   } else if (initialContent.type === "initials") {
  //     if (initials?.mark.startsWith("<svg")) {
  //       return <Signature sharedProps={SVGSharedProps} signatureSVGString={initials.mark} />
  //     } else if (initialsImage) {
  //       return <div {...sharedProps} className="w-100 h-100">
  //         <img src={URL.createObjectURL(initialsImage)} className="w-100 h-100" alt="Initials" />
  //       </div>
  //     } else {
  //       return <TextSignature sharedProps={sharedProps} signature={initials} />
  //     }
  //   }
  // };

  return (
    <div
      className={`wrapper${clearOutline ? "" : " no-outline"}`}
      ref={wrapperRef}
      style={{ position: "absolute" }}
      onMouseMove={handleMouseMove}
    >
      <Controls
        position={controlsPosition}
        onDuplicate={() => onDuplicate(id)}
        onDelete={() => onDelete(id)}
        show={showControls}
      />
      <div
        className={`resize-handle top-left${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle top-center${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle top-right${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle right-center${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle bottom-right${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle bottom-center${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle bottom-left${clearOutline ? "" : " clear"}`}
      ></div>
      <div
        className={`resize-handle left-center${clearOutline ? "" : " clear"}`}

      ></div>

      {typeof initialContent === "string" ? (
        <div
          className={`input${className ? " " + className : ""}`}
          // ref={inputRef}
          contentEditable={editable}
          suppressContentEditableWarning
          onInput={handleContentChange}
          {...sharedProps}
          style={textElstyle}
        />
      ) : initialContent.type === "checkbox" ? (
        <IoIosCheckboxOutline
          className="icon input"
          style={style}
          {...sharedProps}
        />
      )
        : initialContent.type === "whiteout" ? (
          <div className="whiteout input" {...sharedProps} style={style}></div>
        )
          : (initialContent.type === "signature" ? (
            wrapperSignature && wrapperSignature.mark.includes("<svg") ?
              <Signature sharedProps={SVGSharedProps} signatureSVGString={wrapperSignature.mark} /> :
              wrapperSignature && wrapperSignature.mark.startsWith("data:image/") ?
                (
                  <div className="w-100 h-100" {...sharedProps}>
                    <img
                      src={wrapperSignature.mark}
                      alt="Signature"
                      className="w-100 h-100"
                    />
                  </div>
                ) :
                <TextSignature sharedProps={sharedProps} signature={wrapperSignature} />

          ) :
            initialContent.type === "initials" ?
              (initials?.mark.startsWith("<svg") ?
                <Signature sharedProps={SVGSharedProps} signatureSVGString={initials.mark} /> :
                <TextSignature sharedProps={sharedProps} signature={initials} />
              ) : null
          )}
    </div>
  );
};
