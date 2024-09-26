import { WrapperData } from '../InteractLayer';

import { Dispatch } from 'redux';
import { setField } from '@/src/store';
import { Action } from '@reduxjs/toolkit';



export const handleDuplicate = (id: number, dispatch: Dispatch<Action>, updateWrappers: (newWrappers: WrapperData[]) => void, canvasRef: React.RefObject<HTMLDivElement>, stateWrappers: WrapperData[], wrappers: WrapperData[]) => {
    const wrapperToDuplicate = wrappers.find(w => w.id === id);
    if (wrapperToDuplicate) {
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        const newX = Math.min(wrapperToDuplicate.x + 10, (canvasRect?.width || 0) - wrapperToDuplicate.width);
        const newY = Math.min(wrapperToDuplicate.y + 10, (canvasRect?.height || 0) - wrapperToDuplicate.height);
        const newWrapper = { ...wrapperToDuplicate, id: Date.now(), x: newX, y: newY };
        const newWrappers = [...wrappers, newWrapper];
        updateWrappers(newWrappers);
        dispatch(setField({ wrappers: [...stateWrappers, newWrapper] }));
    }
};

export const handleDelete = (id: number, dispatch: Dispatch<Action>, updateWrappers: (newWrappers: WrapperData[]) => void, wrappers: WrapperData[], stateWrappers: WrapperData[]) => {
    const newWrappers = wrappers.filter(w => w.id !== id);
    updateWrappers(newWrappers);
    dispatch(setField({ wrappers: stateWrappers.filter(w => w.id !== id) }));
};

export const handleMove = (id: number, x: number, y: number, dispatch: Dispatch<Action>, updateWrappers: (newWrappers: WrapperData[]) => void, wrappers: WrapperData[]) => {
    const newWrappers = wrappers.map(w => w.id === id ? { ...w, x, y } : w);
    updateWrappers(newWrappers);
    dispatch(setField({ wrappers: newWrappers }));
};

export const handleResize = (id: number, width: number, height: number, dispatch: Dispatch<Action>, updateWrappers: (newWrappers: WrapperData[]) => void, wrappers: WrapperData[]) => {
    const newWrappers = wrappers.map(w => w.id === id ? { ...w, width, height } : w);
    updateWrappers(newWrappers);
    dispatch(setField({ wrappers: newWrappers }));
};


export const handleContentChange = (id: number, content: string, dispatch: Dispatch<Action>, updateWrappers: (newWrappers: WrapperData[]) => void, wrappers: WrapperData[]) => {
    const newWrappers = wrappers.map(w => w.id === id ? { ...w, content } : w);
    updateWrappers(newWrappers);
    dispatch(setField({ wrappers: newWrappers }));
};