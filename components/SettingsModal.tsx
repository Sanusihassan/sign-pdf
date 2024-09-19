import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { LuTextCursorInput } from "react-icons/lu";
import { PiSignature } from "react-icons/pi";
import { DrawInputSign } from './SettingsModal/DrawInputSign';
import { UploadInputSign } from './SettingsModal/UploadInputSign';
import { TextInputSign } from './SettingsModal/TextInputSign';
import { useSelector } from 'react-redux';
import { RootState } from '@/pages/_app';
import { setField } from '@/src/store';
import { useDispatch } from 'react-redux';
import { errors } from '@/content';

const SettingsModal = ({ errors }: { errors: errors }) => {
    // State to track the currently selected item
    const [selectedItem, setSelectedItem] = useState<number>(0);

    // Handler to set the selected item
    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };

    const dispatch = useDispatch();


    const showSignModal = useSelector((state: RootState) => state.tool.showSignModal);

    const setModalHeight = () => {
        if (modalRef.current) {
            modalRef.current.style.height = `${document.documentElement.scrollHeight}px`;
        }
    };

    const closeModal = useCallback(() => {
        dispatch(setField({ showSignModal: false }));
    }, [dispatch]);

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {

        if (showSignModal) {
            document.addEventListener('keydown', handleEscape);
            setModalHeight();
            window.addEventListener('resize', setModalHeight);
            window.addEventListener('scroll', setModalHeight);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('resize', setModalHeight);
            window.removeEventListener('scroll', setModalHeight);
        };
    }, [showSignModal]);

    const modalRef = useRef<HTMLDivElement>(null);


    return (
        showSignModal ?
            (<div className="settings-modal overlay" ref={modalRef} onClick={() => {
                closeModal();
            }}>
                <div className="modal-card" onClick={(e) => {
                    e.stopPropagation();
                }}>
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
                            <DrawInputSign errors={errors} /> :
                            selectedItem === 1 ?
                                <TextInputSign errors={errors} /> :
                                <UploadInputSign errors={errors} />
                        }
                    </section>
                </div>
            </div>) : null
    );
};

export { SettingsModal };
