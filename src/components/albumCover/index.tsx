interface IALbum {
    album_name: string,
    price: number,
    img_url: string;
}
export function AlbumCover({ album_name, price, img_url }: IALbum) {
  return (
      <div style={{ '--bg-fundo': `url(${img_url})` } as React.CSSProperties}
          className="bg-[image:var(--bg-fundo)] justify-center w-[265px] h-72 text-white bg-cover bg-center drop-shadow-[0_35px_35px_rgba(189,189,189,0.1)] rounded">
          <section
              className="backdrop-brightness-50 w-full h-full flex flex-col items-center justify-center text-center">
              <div className="flex justify-center items-center w-full h-3/4">
                  <h3 className="font-bold text-4xl">{album_name}</h3>
              </div>
              <div className="flex justify-end items-center w-[188px] ml-9">
                  <p className="font-bold text-2xl">R$ {price}</p>
              </div>
          </section>
      </div>
  )
}