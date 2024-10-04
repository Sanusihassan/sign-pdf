import { errors } from "@/content";
import { RootState } from "@/pages/_app";
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const processFile = async (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target && typeof event.target.result === 'string') {
                            resolve(event.target.result);
                        } else {
                            reject(new Error('Failed to read file'));
                        }
                    };
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                });
            };

            if (showModalForInitials) {
                const base64Data = await processFile(newFiles[0]);
                dispatch(setField({
                    initials: {
                        color: "",
                        font: "",
                        id: uuid(),
                        mark: base64Data
                    }
                }));
            } else {
                const processedFiles = await Promise.all(newFiles.map(processFile));
                const newSignatures = processedFiles.map(base64Data => ({
                    color: "",
                    font: "",
                    id: uuid(),
                    mark: base64Data
                }));

                dispatch(setField({
                    signatures: [...signatures, ...newSignatures]
                }));

                if (!showModalForInitials) {
                    dispatch(setField({ showSignatureDropdown: true }));
                }
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