"use client";

import { SessionProvider } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export function WrapServerComponent({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}