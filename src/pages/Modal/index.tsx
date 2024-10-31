import { AlbumSaleModel } from "@/models/AlbumSaleModel";
import { album_api } from "@/services/apiService";
import toast from "react-hot-toast";




interface IModalSaleAlbum {
    isOpen: boolean;
    setOpen: (is: boolean) => void;
    albumSale?: AlbumSaleModel
}

export default function ModalSaleAlbum({ isOpen, setOpen, albumSale }: IModalSaleAlbum) {

    if (isOpen) {
        const handleSaleAlbum = async () => {
            try {
                await album_api.post('/albums/sale', {
                    id: albumSale?.id,
                    idSpotify: albumSale?.idSpotify,
                    name: albumSale?.name,
                    artistName: albumSale?.artistName,
                    imageUrl: albumSale?.imageUrl,
                    value: albumSale?.value
                }, {
                    headers: {
                        Authorization: "Basic " + localStorage.getItem("@Auth.Token")?.replace(/"/g, '')
                    }
                }) 
                toast.success("Compra realizada com sucesso.")
            } catch (error) {
                toast.error("Não foi possivel executar a compra tente novamente mais tarde.")
            }
         }
        return (
            <div className="fixed left-0 top-0 right-0 bottom-0 z-[1000] bg-transparent backdrop-brightness-50">
                <section className="fixed translate-x-1/2 -translate-y-1/2 top-[50%] right-1/2 w-[600px] h-[306px] flex flex-row items-center justify-evenly rounded-[20px]">
                    <img className="w-[300px] h-[306px] rounded-l-[20px]" src={albumSale?.imageUrl} alt="" />
                    <div className="w-[300px] text-black h-full flex flex-col justify-around  items-center bg-white rounded-r-[20px]">
                        <div className="flex flex-col-reverse w-full items-end">
                            <div className="w-full flex justify-center">
                                <h3 className="font-bold text-3xl font-lato">{albumSale?.artistName}</h3>
                            </div>
                            <button onClick={() => setOpen(!isOpen)}>
                                <img className="h-10 mr-2" src="/src/assets/Cancel Icon.svg" alt="Ícone para fechar modal" />
                            </button>
                        </div>
                        <p className="font-lato">{albumSale?.name}</p>
                        <p className="font-lato">Lançamento: {albumSale?.dateAlbum}</p>
                        <p className="font-lato">Preço: R$ {albumSale?.value}</p>
                        <button onClick={handleSaleAlbum} className="w-64 h-10 bg-yellow-500 rounded-[40px] text-white font-medium text-3xl">Comprar</button>
                    </div>
                </section>
            </div>
        )
    } else {
        return <></>
    }
}
