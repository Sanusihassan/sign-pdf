// when setting the initials to null why is'nt it updated in the dom? the value of the initials also is not updated to null when pressing the delete-btn
import React, { useEffect, useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import type { edit_page as _ } from "../../content";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuTextCursorInput } from "react-icons/lu";
import { PiSignature } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setField, signature } from "@/src/store";
import { RootState } from "@/pages/_app";
import { FaChevronDown } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDrag } from "react-dnd";

export interface OptionsProps {
  layout?: string;
  edit_page: _;
}

const SignatureDropDown = ({ show }: {
  show: boolean;
}) => {
  const dispatch = useDispatch();
  const signatureSVGString = useSelector((state: RootState) => state.tool.signatureSVGString);
  return <div className={`signature-dropdown${show ? "" : " hide"}`}>
    <div className="signature-area">
      <div className="signature-area-svg">
        <Signature signatureSVGString={signatureSVGString} />
      </div>
      <button className="delete-btn" onClick={(e) => {
        e.stopPropagation();
        dispatch(setField({
          signatureSVGString: ""
        }));
        setField({ signatureSVGString: "" })
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
type sharedProps = {
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

export const TextSignature = ({ sharedProps, signatures, signature }: { signatures?: signature[], signature?: signature | null } & sharedProps) => {
  return (
    signatures && signatures.length > 0 ?
      <div className={`signature-svg input ${signatures[0].font}`} style={{
        color: signatures[0].color
      }}
        {...sharedProps}
      >
        {signatures[0].mark}
      </div> : signature ? <div className={`signature-svg input ${signature.font}`} style={{
        color: signature.color
      }}>{signature.mark}</div> : null
  )
}


const InitialsRow = () => {
  const dispatch = useDispatch();
  const initials = useSelector((state: RootState) => state.tool.initials);
  const [{ isDragging: isDraggingInitials }, dragInitialsRef] = useDrag(() => ({
    type: "initials",
    item: { type: "initials", initials },
    collect: (monitor) => {
      dispatch(setField({ acceptPointerEvents: true }));
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));
  useEffect(() => {
    console.log(initials)
  }, [initials]);
  return (
    <div className="option-row initials-row" onClick={() => {
      dispatch(setField({
        showSignModal: true
      }));

      dispatch(setField({
        showModalForInitials: true
      }));
    }}>
      <div className={`initials-drag-el${initials === null ? " hide" : ""}`} ref={dragInitialsRef} onClick={e => {
        e.stopPropagation();
        dispatch(setField({ acceptPointerEvents: true }));
      }} />
      <PiDotsSixVerticalBold className="icon" />
      {initials ?
        (
          <div className="initials">
            {
              initials?.mark.startsWith("<svg") ?
                <Signature signatureSVGString={initials.mark} />
                : <TextSignature signature={initials} />
            }
            <button className="delete-btn" onClick={(e) => {
              e.stopPropagation();
              setField({
                initials: null
              });
              console.log("clicked", initials)
            }}>
              <IoTrashOutline className="icon" />
            </button>
          </div>
        ) :
        <>
          <div className="option-label">Your initials</div>
          <strong className="option-add">Add</strong>
        </>
      }
    </div>
  )
}

const Options = ({ layout, edit_page }: OptionsProps) => {
  const dispatch = useDispatch();
  // const initials = useSelector((state: RootState) => state.tool.initials);
  const [showSignatureDropdown, setShowSignatureDropdown] = useState(false);

  const enablePointerEvents = () => {
    dispatch(setField({ acceptPointerEvents: true }));
  }

  // const disablePointerEvents = () => {
  //   dispatch(setField({ acceptPointerEvents: false }));
  // }

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "text",
    item: { type: "text" },
    collect: (monitor) => {
      enablePointerEvents();
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  const [{ isDragging: isDraggingDate }, dragDateRef] = useDrag(() => ({
    type: "date",
    item: { type: "date", date: new Date() },
    collect: (monitor) => {
      enablePointerEvents();
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));



  const [{ isDragging: isDraggingCheckbox }, dragCheckboxRef] = useDrag(() => ({
    type: "checkbox",
    item: { type: "checkbox" },
    collect: (monitor) => {
      enablePointerEvents();
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  const signatureSVGString = useSelector((state: RootState) => state.tool.signatureSVGString);
  const signatures = useSelector((state: RootState) => state.tool.signatures);
  const [{ }, dragSignatureRef] = useDrag(() => ({
    type: "signature",
    item: { type: "signature" },
    canDrag: !(signatureSVGString && signatures.length > 0),
    collect: (monitor) => {
      enablePointerEvents();
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }), [signatureSVGString]);

  useEffect(() => {
    console.log(!!(signatureSVGString || signatures.length > 0))
  }, []);

  return (
    <div className="sign-pdf-options">
      <div className={`option-row${showSignatureDropdown ? " dropdown-visible" : ""}`} onClick={() => {
        dispatch(setField({
          showSignModal: true
        }));

        dispatch(setField({
          showModalForInitials: false
        }));
      }}>
        <div className="signature-drag-el" ref={dragSignatureRef} onClick={enablePointerEvents} />
        <PiDotsSixVerticalBold className="icon" />
        {signatureSVGString ? (
          <>
            <Signature signatureSVGString={signatureSVGString} />
            <button className="dropdown-toggler" onClick={(e) => {
              e.stopPropagation();
              setShowSignatureDropdown(!showSignatureDropdown)
            }}>
              <FaChevronDown />
            </button>
            <SignatureDropDown show={showSignatureDropdown} />
          </>
        ) :
          (signatures.length ?
            <TextSignature signatures={signatures} />
            :
            <>
              <PiSignature />
              <div className="option-label">Your signature</div>
              <strong className="option-add">Add</strong>
            </>
          )
        }
      </div>
      <InitialsRow />
      <div className="option-row additional-text">
        <div className="additional-text-drag-el" ref={dragRef} onClick={enablePointerEvents} />
        <PiDotsSixVerticalBold className="icon" />
        <LuTextCursorInput />
        <div className="option-label">Additional text</div>
      </div>
      <div className="option-row date-row">
        <div className="date-drag-el" ref={dragDateRef} onClick={enablePointerEvents} />
        <PiDotsSixVerticalBold className="icon" />
        <CiCalendarDate className="icon" />
        <div className="option-label">Date</div>
      </div>

      <div className="option-row checkbox-row">
        <div className="checkbox-drag-el" ref={dragCheckboxRef} onClick={enablePointerEvents} />
        <PiDotsSixVerticalBold className="icon" />
        <IoIosCheckboxOutline className="icon" />
        <div className="option-label">Checkbox</div>
      </div>
    </div>
  );
};

export default Options;