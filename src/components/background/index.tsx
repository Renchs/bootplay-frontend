import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Background({ children }: PropsWithChildren) {
    const location = useLocation();
    const [backgroundStyle, setBackgroundStyle] = useState("");

    useEffect(() => {
        if (location.pathname === "/dashboard") {
            setBackgroundStyle("")
        } else if (location.pathname === "/login"
            || location.pathname === "/signup"
            || location.pathname === "/") {
            setBackgroundStyle("bg-img-home")
        } else {
            setBackgroundStyle("bg-[rgba(25,_24,_31,_1)]")
        }
    }, [location.pathname])

    return (
        <div className={`${backgroundStyle} bg-cover bg-center`}>
            {children}
        </div>
    )
}
