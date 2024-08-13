import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { LuTextCursorInput } from "react-icons/lu";
import { PiSignature } from "react-icons/pi";
import { DrawInputSign } from './SettingsModal/DrawInputSign';
import { UploadInputSign } from './SettingsModal/UploadInputSign';
import { TextInputSign } from './SettingsModal/TextInputSign';
import { useSelector } from 'react-redux';
import { RootState } from '@/pages/_app';

const SettingsModal: React.FC = () => {
    // State to track the currently selected item
    const [selectedItem, setSelectedItem] = useState<number>(0);

    // Handler to set the selected item
    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };


    const showSignModal = useSelector((state: RootState) => state.tool.showSignModal);

    useEffect(() => {
        if (showSignModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [showSignModal]);

    return (
        <div className={`settings-modal overlay${showSignModal ? "" : " hide"}`}>
            <div className="modal-card">
                <aside className="sidebar">
                    <ul className="tabs">
                        <li
                            className={`item ${selectedItem === 0 ? 'selected' : ''}`}
                            onClick={() => handleItemClick(0)}
                        >
                            <PiSignature className="icon" />
                            Draw
                        </li>
                        <li
                            className={`item ${selectedItem === 1 ? 'selected' : ''}`}
                            onClick={() => handleItemClick(1)}
                        >
                            <LuTextCursorInput className="icon" />
                            Type
                        </li>
                        <li
                            className={`item ${selectedItem === 2 ? 'selected' : ''}`}
                            onClick={() => handleItemClick(2)}
                        >
                            <MdOutlineFileUpload />
                            Upload
                        </li>
                    </ul>
                </aside>
                <section className="content">
                    {selectedItem === 0 ?
                        <DrawInputSign /> :
                        selectedItem === 1 ?
                            <TextInputSign /> :
                            <UploadInputSign />
                    }
                </section>
            </div>
        </div>
    );
};

export { SettingsModal };
