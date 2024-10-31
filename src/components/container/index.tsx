import React from "react";

interface AuxProps {
    children: React.ReactNode;
    styles?: string
}

export default function Container({children, styles}: AuxProps) {
  return (
      <div className={`w-full h-screen flex justify-center flex-col ${styles} bg-cover bg-no-repeat  `}>
          {children}
      </div>
  )
}
