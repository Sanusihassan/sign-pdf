import React, { Dispatch } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import type { edit_page } from "../../content";
import { CiCalendarDate } from "react-icons/ci";
import { LuTextCursorInput } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setField } from "@/src/store";
import { useDrag } from "react-dnd";
import { InitialsRow } from "./Options/InitialsRow";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { Action } from "@reduxjs/toolkit";
import { SignatureRow } from "./Options/SignatureRow";
import { CiEraser } from "react-icons/ci";


export interface OptionsProps {
  content: edit_page["options"];
}

export const enablePointerEvents = (dispatch: Dispatch<Action>) => {
  dispatch(setField({ acceptPointerEvents: true }));
}

const Options = ({ content }: OptionsProps) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "text",
    item: { type: "text" },
    collect: (monitor) => {
      enablePointerEvents(dispatch);
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  const [{ isDragging: isDraggingDate }, dragDateRef] = useDrag(() => ({
    type: "date",
    item: { type: "date", date: new Date() },
    collect: (monitor) => {
      enablePointerEvents(dispatch);
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  const [{ isDragging: isDraggingCheckbox }, dragCheckboxRef] = useDrag(() => ({
    type: "checkbox",
    item: { type: "checkbox" },
    collect: (monitor) => {
      enablePointerEvents(dispatch);
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  const [{ isDragging: isDraggingWhiteOut }, dragWhiteOutRef] = useDrag(() => ({
    type: "whiteout",
    item: { type: "whiteout" },
    collect: (monitor) => {
      enablePointerEvents(dispatch);
      return ({
        isDragging: !!monitor.isDragging(),
      })
    },
  }));

  return (
    <div className="sign-pdf-options">
      <SignatureRow content={content.signature_row} />
      <InitialsRow content={content.initials} />
      <div className="option-row additional-text">
        <div className="additional-text-drag-el" ref={dragRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <LuTextCursorInput />
        <div className="option-label">{content.additional_text}</div>
      </div>
      <div className="option-row date-row">
        <div className="date-drag-el" ref={dragDateRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <CiCalendarDate className="icon" />
        <div className="option-label">{content.date}</div>
      </div>

      <div className="option-row checkbox-row">
        <div className="checkbox-drag-el" ref={dragCheckboxRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <IoIosCheckboxOutline className="icon" />
        <div className="option-label">{content.checkbox}</div>
      </div>

      <div className="option-row whiteout">
        <div className="checkbox-drag-el" ref={dragWhiteOutRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <CiEraser className="icon" />
        <div className="option-label">{content.whiteout}</div>
      </div>
      {/* add two new rows for white-out and black-out: */}
    </div>
  );
};

export default Options;