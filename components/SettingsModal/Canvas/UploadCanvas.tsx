import { errors } from "@/content";
import { RootState } from "@/pages/_app";
import { useFileStore } from "@/src/file-store";
import { setField } from "@/src/store";
import { IoIosImages } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/tiff",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "image/heif",
];

const allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "bmp",
    "tiff",
    "gif",
    "svg",
    "webp",
    "heif"
];

function validateImages(files: File[]): boolean {
    return files.every(file => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        return (
            allowedMimeTypes.includes(file.type) &&
            fileExtension !== undefined &&
            allowedExtensions.includes(fileExtension)
        );
    });
}

export const UploadCanvas = ({ errors }: { errors: errors }) => {
    const showModalForInitials = useSelector((state: RootState) => state.tool.showModalForInitials);
    const signatures = useSelector((state: RootState) => state.tool.signatures);
    const dispatch = useDispatch();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _files = e.target.files;
        if (!_files || _files.length === 0) {
            dispatch(setField({ errorMessage: errors.NO_FILES_SELECTED.message }));
            return;
        }

        const newFiles = Array.from(_files);

        // Check file size (assuming max size is 20MB)
        const maxSize = 20 * 1024 * 1024; // 20MB in bytes
        if (newFiles.some(file => file.size > maxSize)) {
            dispatch(setField({ errorMessage: errors.FILE_TOO_LARGE.message }));
            return;
        }

        // Check if files are empty
        if (newFiles.some(file => file.size === 0)) {
            dispatch(setField({ errorMessage: errors.EMPTY_FILE.message }));
            return;
        }

        // Validate file types
        if (!validateImages(newFiles)) {
            dispatch(setField({ errorMessage: errors.NOT_SUPPORTED_TYPE.types.IMAGE }));
            return;
        }

        // Check maximum number of files (assuming max is 10)
        const maxFiles = 10;
        if (newFiles.length > maxFiles) {
            dispatch(setField({ errorMessage: errors.MAX_FILES_EXCEEDED.message }));
            return;
        }

        try {
            const file = newFiles[0];
            if (showModalForInitials) {
                dispatch(setField({
                    initials: {
                        color: "",
                        font: "",
                        id: uuid(),
                        mark: URL.createObjectURL(file)
                    }
                }))
            } else {
                newFiles.forEach(file => {
                    const newSig = {
                        color: "",
                        font: "",
                        id: uuid(),
                        mark: URL.createObjectURL(file)
                    };
                    dispatch(setField({
                        signatures: [...signatures, newSig]
                    }));
                    if (!showModalForInitials) {
                        dispatch(setField({ showSignatureDropdown: true }));
                    }
                })
                // if (signatureImages) {
                //     setSignatureImages([...signatureImages, ...newFiles]);
                // } else {
                //     setSignatureImages([...newFiles]);
                // }
            }
        } catch (error) {
            dispatch(setField({ errorMessage: errors.UNKNOWN_ERROR.message }));
        }
    };

    return (
        <div className="upload-canvas">
            <div className="upload-wrapper">
                <div className="upload-btn">
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input"
                        onChange={handleFileUpload}
                        multiple={!showModalForInitials}
                    />
                    <IoIosImages />
                    <span>
                        Select IMAGE
                    </span>
                </div>
                <p className="drop-msg">
                    Drag & Drop or paste your image here
                </p>
            </div>
        </div>
    );
};