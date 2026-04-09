import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function SharedLayout({children} : Readonly<{children: ReactNode}>){
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}