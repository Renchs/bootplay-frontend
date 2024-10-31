import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { AlbumCover } from "../../components/albumCover/index";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { album_api } from "@/services/apiService";
import { AlbumModel } from "@/models/AlbumModel";
import ModalSaleAlbum from "../Modal";
import { AlbumSaleModel } from "@/models/AlbumSaleModel";
import Autoplay from "embla-carousel-autoplay"

export default function Dashboard() {
  const [album, setAlbum] = useState<AlbumModel[]>([]);
  const [isFind, setIsFind] = useState(false);
  const [searchAlbum, setSearchAlbum] = useState<string>("");
  const [findAlbum, setFindAlbum] = useState<AlbumModel[]>([]);
  const [openModal, setOpen] = useState(false);
  const [albumSale, setAlbumSale] = useState<AlbumSaleModel>();


  

  const handleIndexModal = (i: number, albumSearch?: AlbumModel[]) => {
    if (!albumSearch) {
        setAlbumSale({
          dateAlbum: album[i].releaseDate,
          name: album[i].name,
          imageUrl: album[i].images[0].url,
          artistName: album[i].artists[0].name,
          value: album[i].value,
          id: Number(album[i].id),
          idSpotify: album[i].artists[0].id
        });
    } else {
      setAlbumSale({
        dateAlbum: findAlbum[i].releaseDate,
        name: findAlbum[i].name,
        imageUrl: findAlbum[i].images[0].url,
        artistName: findAlbum[i].artists[0].name,
        value: findAlbum[i].value,
        id: Number(findAlbum[i].id),
        idSpotify: findAlbum[i].artists[0].id
      });
    }
    setOpen(true)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAlbum(event.target.value);
  };

  const handleFindAlbum = async () => {    
    album_api
      .get(`/albums/all?searchText=${searchAlbum || "RAP"}`, {
        headers: { Authorization: "Basic " + localStorage.getItem("@Auth.Token")?.replace(/"/g, '') }
      })
      .then((response) => {
        setFindAlbum(response.data);
        searchAlbum.length > 0 ? setIsFind(true) : setIsFind(false);
      });
  };

  useEffect(() => {    
    album_api.get("/albums/all?searchText=RAP", {
      headers: { Authorization: "Basic " + localStorage.getItem("@Auth.Token")?.replace(/"/g, '') }
    }).then((response) => {
      setAlbum(response.data);
    });
  }, []);
  
  return (
    <div className="w-full relative">
      
      <ModalSaleAlbum
        albumSale={albumSale}
        isOpen={openModal}
        setOpen={setOpen}
      />
      <div className="bg-cover bg-center bg-no-repeat bg-img-dashboard h-[650px] w-full flex justify-start items-center">
        <section className="container ml-7 flex flex-col items-start justify-center text-white gap-8">
          <h2 className="text-4xl font-semibold w-[504px]">
            A história da música não pode ser esquecida!
          </h2>
          <p className="text-2xl">Sucessos que marcaram o tempo!!!</p>
        </section>
      </div>
      <div className="shadow-[0px_11px_43px_69px_rgba(25,_24,_31,_1)] bg-[rgba(25,_24,_31,_1)] flex justify-start items-center flex-col">
        <div className="w-[448px] h-[56px] flex items-center justify-center border border-zinc-300 rounded-xl">
          <input
            type="search"
            className="flex border-none bg-transparent w-full h-[56px] text-white px-4 focus:outline-none"
            value={searchAlbum}
            onChange={handleInputChange}
          />
          <button
            onClick={handleFindAlbum}
            className="h-full px-3 flex items-center justify-center"
          >
            <img src="/src/assets/magnifying-glass.svg" alt="" />
          </button>
        </div>
        <div className="flex flex-wrap w-full max-w-[1310px] justify-center gap-12 mt-6">
          {isFind &&
            findAlbum.map((album, i) => {
              return (
                <>
                  <button onClick={() => handleIndexModal(i, findAlbum)}>
                    <AlbumCover
                      key={album.id}
                      album_name={album.name}
                      price={album.value}
                      img_url={album.images[0].url}
                    />
                  </button>
                </>
              );
            })}
          {!isFind && (
            <div className="container flex items-start justify-center flex-col gap-12 max-w-[1200px]">
              <div className="flex w-full items-center justify-center flex-col gap-6">
                <h3 className="text-white font-bold text-5xl font-lato ml-2 self-baseline">
                  Trends
                </h3>
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnMouseEnter: true,
                      stopOnInteraction: false
                    })
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-[1200px] h-[361px]"
                >
                  <CarouselContent>
                    {album.map((albums, i) => {
                      return (
                        <CarouselItem
                          key={i}
                          className="md:basis-1/2 lg:basis-1/4"
                        >
                          <>
                            <button onClick={() => handleIndexModal(i)}>
                              <Card key={i} className="flex items-center justify-center bg-transparent border-none">
                                <AlbumCover
                                  album_name={albums.name}
                                  price={albums.value}
                                  img_url={albums.images[0].url}
                                />
                              </Card>
                            </button>
                          </>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}