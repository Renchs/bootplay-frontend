import { Link } from "react-router-dom"

interface IButton {
  styles: string,
  textLink: string,
  link: string
}
export default function ButtonHeader({styles, textLink, link}: IButton) {
  return (
    <Link to={link} className={`flex justify-center items-center w-[200px] h-12 text-xl font-semibold rounded-[32px] ${styles}`}>
      {textLink}
    </Link>
  )
}


//flex justify-center items-center w-[200px] h-12 text-xl font-semibold rounded-3xl