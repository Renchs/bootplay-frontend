interface ICardMyDisc {
    img: string,
    titleCard: string,
    textCard: string,
    style?: string
}

export default function CardMyDisc({img, titleCard, textCard, style} : ICardMyDisc) {
    return (
        <div className="w-60 h-[87px] flex items-center justify-center bg-white text-black gap-4 rounded-[10px]">
            <div className="flex items-center justify-center w-10 h-10 container bg-black rounded-full mb-5">
                <img className="h-6" src={img} alt="icone do card" />
            </div>
            <div className="gap-3">
                <p className="font-semibold text-sm">{titleCard}</p>
                <p className={`${style} font-normal text-2xl`}>{textCard}</p>
            </div>
        </div>
    )
}
