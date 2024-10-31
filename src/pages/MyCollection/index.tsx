
import CardMyDisc from "@/components/cardMyDisc";
import { AlbumCover } from "@/components/albumCover";
import { useEffect, useState } from "react";
import { album_api } from "@/services/apiService";
import { AlbumSaleModel } from "@/models/AlbumSaleModel";

export default function MyCollection() {
    const [album, setAlbum] = useState<AlbumSaleModel[]>([]);

    useEffect(() => {        

        album_api.get("/albums/my-collection", {
            headers: {
                Authorization: "Basic " + localStorage.getItem("@Auth.Token")?.replace(/"/g, '')
            }
        }).then((response) => {     
            
            setAlbum(response.data);
        })

    }, [])

    return (
        <section className="w-full min-h-screen text-white flex flex-col gap-6">
            <div className="flex mt-36 justify-center flex-col items-center gap-14">
                <div className="flex flex-col ml-14 gap-10 items-start justify-center w-2/3">
                    <h2 className="ml-1 font-bold text-5xl font-lato">Meus Discos</h2>
                    <div className="flex gap-5">
                        <CardMyDisc img="/src/assets/file-video.svg" titleCard="Total de Albums" textCard={`${album.length}`} />
                        <CardMyDisc img="/src/assets/dollar-sign.svg" titleCard="Valor investido" textCard={`R$ ${album.reduce((acc, al) => acc + al.value, 0).toFixed(2)}`} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-12 justify-center items-center w-[1272px] ">
                    {album.map((album, i) => {
                        return (
                            <AlbumCover
                                album_name={album.name}
                                img_url={album.imageUrl}
                                price={album.value}
                                key={i} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}