/**
 * let's use fabric.js to create a resizable and droppable input fabric.js element
 * when dropping .additional-text-drag-el on a div that has a .page class
 * then drop it on the PageCanvas it should only appear when droppign it on a PageCanvas each time dragging the additional-text a fabric.js input should appear draggable but only be inserted on each page if released.
 * import{renderPDFOnCanvas}from"@/src/utils";import{useRef,useEffect}from"react";import{useInView}from"react-intersection-observer";import{TransformWrapper,TransformComponent}from"react-zoom-pan-pinch";import{fabric}from'fabric';interface PageCanvasProps{id:number;file:File;setCurrentPage:React.Dispatch<React.SetStateAction<number>>;isVisible:boolean}export const PageCanvas:React.FC<PageCanvasProps> =({id,file,setCurrentPage,isVisible})=>{const canvasRef=useRef<HTMLCanvasElement>(null);const{ref,inView}=useInView({threshold:0.01,triggerOnce:false});useEffect(()=>{if(inView){setCurrentPage(id)}},[inView,id,setCurrentPage]);useEffect(()=>{if(isVisible&&canvasRef.current){renderPDFOnCanvas(canvasRef.current,id,file)}},[isVisible,id,file]);return(<div ref={ref} className="page"><TransformWrapper initialScale={1} pinch={{step:10}} limitToBounds={true} centerOnInit={true} minScale={1} maxScale={3} doubleClick={{mode:"toggle",animationType:"easeInOutQuad"}} wheel={{disabled:true};}> <TransformComponent> <canvas ref={canvasRef} className="img-fluid-custom object-fit-contain rounded item-img" id={`page-${id}`;}/> </TransformComponent></TransformWrapper></div>)};
 * please give me the complete code solution. when dragging the additional-text-drag-el it's opacity should stay 1. only when dropping it it should disappear i.e opacity 0
 * while additional-text-drag-el entering a .page area the fabric.js input enters. and it should be draggable should follow the mouse where we drop it.
 */


import React, { useEffect, useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import type { edit_page as _ } from "../../content";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuTextCursorInput } from "react-icons/lu";
import { PiSignature } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/src/store";
import { RootState } from "@/pages/_app";
import { FaChevronDown } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDrag } from "react-dnd";

export interface OptionsProps {
  layout?: string;
  edit_page: _;
  initials?: string;
}

const SignatureDropDown = ({ scaledSVG, show, setScaledSVG }: {
  scaledSVG: string,
  show: boolean;
  setScaledSVG: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const dispatch = useDispatch();
  return <div className={`signature-dropdown${show ? "" : " hide"}`}>
    <div className="signature-area">
      <div className="signature-area-svg">
        <Signature scaledSVG={scaledSVG} />
      </div>
      <button className="delete-btn" onClick={(e) => {
        e.stopPropagation();
        dispatch(setField({
          signatureSVGString: ""
        }));
        setScaledSVG(null)
      }}>
        <IoTrashOutline className="icon" />
      </button>
    </div>
    <button className="add-signature main-btn-outlined">
      <IoIosAddCircleOutline className="icon add-icon" />
      Add Signature
    </button>
  </div>
}

const Signature = ({ scaledSVG }: { scaledSVG: string }) => {
  return <div
    className="signature-svg"
    dangerouslySetInnerHTML={{ __html: scaledSVG }}
  />
}

const Options = ({ layout, edit_page, initials = "AB" }: OptionsProps) => {
  const dispatch = useDispatch();
  const showSignModal = useSelector((state: RootState) => state.tool.showSignModal);
  const signatureSVGString = useSelector((state: RootState) => state.tool.signatureSVGString);
  const [scaledSVG, setScaledSVG] = useState<string | null>(null);
  const [showSignatureDropdown, setShowSignatureDropdown] = useState(false);
  useEffect(() => {
    if (signatureSVGString) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(signatureSVGString, "image/svg+xml");
      const svgElement = svgDoc.querySelector("svg");

      if (svgElement) {
        // Set a fixed viewBox
        svgElement.setAttribute("viewBox", "0 0 256 256");
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


  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "text",
    item: { type: "text" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="sign-pdf-options">
      <div className={`option-row${showSignatureDropdown ? " dropdown-visible" : ""}`} onClick={() => {
        dispatch(setField({
          showSignModal: true
        }));
        console.log(showSignModal)
      }}>
        <PiDotsSixVerticalBold className="icon" />
        {scaledSVG ? (
          <>
            <Signature scaledSVG={scaledSVG} />
            <button className="dropdown-toggler" onClick={(e) => {
              e.stopPropagation();
              setShowSignatureDropdown(!showSignatureDropdown)
            }}>
              <FaChevronDown />
            </button>
            <SignatureDropDown scaledSVG={scaledSVG} show={showSignatureDropdown} setScaledSVG={setScaledSVG} />
          </>
        ) :
          <>
            <PiSignature />
            <div className="option-label">Your signature</div>
            <strong className="option-add">Add</strong>
          </>
        }
      </div>
      <div className="option-row">
        <PiDotsSixVerticalBold className="icon" />
        <div className="initials-icon">
          {initials}
        </div>
        <div className="option-label">Your initials</div>
        <strong className="option-add">Add</strong>
      </div>
      <div className="option-row additional-text">
        <div className="additional-text-drag-el" ref={dragRef}>
          text
        </div>
        <PiDotsSixVerticalBold className="icon" />
        <LuTextCursorInput />
        <div className="option-label">Additional text</div>
      </div>
      <div className="option-row">
        <PiDotsSixVerticalBold className="icon" />
        <CiCalendarDate className="icon" />
        <div className="option-label">Date</div>
      </div>
      <div className="option-row">
        <PiDotsSixVerticalBold className="icon" />
        <IoIosCheckboxOutline className="icon" />
        <div className="option-label">Checkbox</div>
      </div>
    </div>
  );
};

export default Options;