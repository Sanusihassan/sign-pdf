import React from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import type { edit_page as _ } from "../../content";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuTextCursorInput } from "react-icons/lu";
import { PiSignature } from "react-icons/pi";

export interface OptionsProps {
  layout?: string;
  edit_page: _;
  initials?: string;
}

const Options = ({ layout, edit_page, initials = "AB" }: OptionsProps) => {
  return (
    <div className="sign-pdf-options">
      <div className="option-row">
        <PiDotsSixVerticalBold className="icon" />
        <PiSignature />
        <div className="option-label">Your signature</div>
        <strong className="option-add">Add</strong>
      </div>
      <div className="option-row">
        <PiDotsSixVerticalBold className="icon" />
        <div className="initials-icon">
          {initials}
        </div>
        <div className="option-label">Your initials</div>
        <strong className="option-add">Add</strong>
      </div>
      <div className="option-row">
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
