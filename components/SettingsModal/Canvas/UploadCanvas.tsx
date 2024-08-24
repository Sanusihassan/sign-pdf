import { useFileStore } from "@/src/file-store";
import { IoIosImages } from "react-icons/io";
export const UploadCanvas = () => {
    const { setUploadedImage } = useFileStore();
    return (
        <div className="upload-canvas">
            <div className="upload-wrapper">
                <div className="upload-btn">
                    <input type="file" accept="image/*" className="file-input" onChange={(e) => {
                        const _files = (e.target?.files as FileList) || null;
                        if (_files) {
                            setUploadedImage([...Array.from(_files)][0])
                        }
                    }} />
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
    )
}