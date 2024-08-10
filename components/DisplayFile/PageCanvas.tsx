import React, { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useInView } from 'react-intersection-observer';

interface PageCanvasProps {
    id: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    zoomLevel: number;
}

const PageCanvas: React.FC<PageCanvasProps> = ({ id, canvasRef, setCurrentPage, zoomLevel }) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    useEffect(() => {
        console.log(inView);
        if (inView) {
            setCurrentPage(id);
        }
    }, [inView, id, setCurrentPage]);

    return (
        <div ref={ref} className="page" style={{
            transform: `scale(${zoomLevel})`,
        }}>
            <TransformWrapper
                initialScale={1}
                pinch={{ step: 10 }}
                limitToBounds={true}
                centerOnInit={true}
                minScale={1}
                maxScale={3}
                doubleClick={{
                    mode: "toggle",
                    animationType: "easeInOutQuad",
                }}
                wheel={{
                    disabled: true
                }}
            >
                <TransformComponent>
                    <canvas
                        ref={canvasRef}
                        className="img-fluid-custom object-fit-contain rounded item-img"
                        id={`page-${id}`}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default PageCanvas;