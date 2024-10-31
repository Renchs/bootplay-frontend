import { Link, useLocation } from "react-router-dom";
import ButtonHeader from "../buttonHeader";
import { useAuth } from "../../hooks/UseAuth";

export default function Header() {
    const path = useLocation().pathname;
    const { isAuthenticated } = useAuth();
    return (
        <>
            {path !== "/login" && path !== "/signup" && (
                <header className="h-[75px] fixed w-full z-10 px-24 flex items-center justify-between bg-white/30 backdrop-blur-sm backdrop-brightness-50">
                    <img src="/src/assets/logo.svg" alt="Ìcone com o nome do site" className="h-12 w-[164px]" />
                    <nav className="flex gap-12 items-center">
                        {isAuthenticated && (
                            <>
                                <Link to={"/dashboard"} className="font-medium text-white">Dashboard</Link>
                                <Link to={"/meus-discos"} className="font-medium text-white">Meus Discos</Link>
                                <Link to={"/dashboard"} className="font-medium text-white">Carteira</Link>
                                <img src="/src/assets/icon-perfil.svg" alt="Ìcone de usuario" />
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <ButtonHeader styles="text-white bg-black" link="/login" textLink="Entrar" />
                                <ButtonHeader styles="bg-sky-300 text-black" link="/signup" textLink="Inscrever-se" />
                            </>
                        )}
                    </nav>
                </header>
            )}
        </>
    )
}


/**
 import React from "react";

interface AuxProps {
    children: React.ReactNode;
    styles?: string
}

export default function Container({children, styles}: AuxProps) {
  return (
      <div className={`w-full h-screen flex justify-center flex-col ${styles} bg-cover bg-no-repeat object-none object-center`}>
          {children}
      </div>
  )
}

{path !== "/login" && path !== "/signup" && (
                <header className="h-[75px] w-full px-24 z-10 flex fixed items-center justify-between bg-white/30 backdrop-blur-md">
                    <img src="/src/assets/logo.svg" alt="" className="h-12 w-[164px]" />
                    <nav className="flex gap-12">
                        <ButtonHeader styles="text-white bg-black" link="/login" textLink="Entrar" />
                        <ButtonHeader styles="bg-sky-300 text-white" link="/signup" textLink="Inscrever-se" />
                    </nav>
                </header>
            )}

  
 */