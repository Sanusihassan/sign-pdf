import React, { Dispatch, useEffect, useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import type { edit_page as _ } from "../../content";
import { CiCalendarDate } from "react-icons/ci";
import { LuTextCursorInput } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/src/store";
import { RootState } from "@/pages/_app";
import { useDrag } from "react-dnd";
import { InitialsRow } from "./Options/InitialsRow";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { Action } from "@reduxjs/toolkit";
import { SignatureRow } from "./Options/SignatureRow";

export interface OptionsProps {
  layout?: string;
  edit_page: _;
}

export const enablePointerEvents = (dispatch: Dispatch<Action>) => {
  dispatch(setField({ acceptPointerEvents: true }));
}



const Options = ({ layout, edit_page }: OptionsProps) => {
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

  return (
    <div className="sign-pdf-options">
      <SignatureRow />
      <InitialsRow />
      <div className="option-row additional-text">
        <div className="additional-text-drag-el" ref={dragRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <LuTextCursorInput />
        <div className="option-label">Additional text</div>
      </div>
      <div className="option-row date-row">
        <div className="date-drag-el" ref={dragDateRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <CiCalendarDate className="icon" />
        <div className="option-label">Date</div>
      </div>

      <div className="option-row checkbox-row">
        <div className="checkbox-drag-el" ref={dragCheckboxRef} onClick={() => enablePointerEvents(dispatch)} />
        <PiDotsSixVerticalBold className="icon" />
        <IoIosCheckboxOutline className="icon" />
        <div className="option-label">Checkbox</div>
      </div>
    </div>
  );
};

export default Options;