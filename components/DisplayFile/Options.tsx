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
        svgElement.setAttribute("viewBox", "0 100 256 256");
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

  const [{ isDragging: isDraggingDate }, dragDateRef] = useDrag(() => ({
    type: "date",
    item: { type: "date", date: new Date() },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging: isDraggingInitials }, dragInitialsRef] = useDrag(() => ({
    type: "initials",
    item: { type: "initials", initials },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging: isDraggingCheckbox }, dragCheckboxRef] = useDrag(() => ({
    type: "checkbox",
    item: { type: "checkbox" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const [{ }, dragSignatureRef] = useDrag(() => ({
    type: "signature",
    item: { type: "signature" },
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
        <div className="signature-drag-el" ref={dragSignatureRef} />
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
      <div className="option-row initials-row">
        <div className="initials-drag-el" ref={dragInitialsRef} />
        <PiDotsSixVerticalBold className="icon" />
        <div className="initials-icon">
          {initials}
        </div>
        <div className="option-label">Your initials</div>
        <strong className="option-add">Add</strong>
      </div>
      <div className="option-row additional-text">
        <div className="additional-text-drag-el" ref={dragRef} />
        <PiDotsSixVerticalBold className="icon" />
        <LuTextCursorInput />
        <div className="option-label">Additional text</div>
      </div>
      <div className="option-row date-row">
        <div className="date-drag-el" ref={dragDateRef} />
        <PiDotsSixVerticalBold className="icon" />
        <CiCalendarDate className="icon" />
        <div className="option-label">Date</div>
      </div>

      <div className="option-row checkbox-row">
        <div className="checkbox-drag-el" ref={dragCheckboxRef} />
        <PiDotsSixVerticalBold className="icon" />
        <IoIosCheckboxOutline className="icon" />
        <div className="option-label">Checkbox</div>
      </div>
    </div>
  );
};

export default Options;