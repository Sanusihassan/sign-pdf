import React from "react";
import type { signature } from "@/src/store";
import type { sharedProps } from "./Signature";

export const TextSignature = ({ sharedProps, signature }: { signature: signature | null } & sharedProps) => {
    if (!signature) return null;

    return (
        <div
            className={`signature-svg input ${signature.font}`}
            style={{
                color: signature.color
            }}
            {...sharedProps}
        >
            {signature.mark}
        </div>
    );
};


