import { getAlbum } from "@/app/lib/actions";
import Track from "@/app/ui/Track";
import Image from "next/image";

export default async function Page( { params } ){
  
  const { id } =  params;
  

  const [album, tracks] = await getAlbum(id);
  return (
    <>
    <p>album details go here</p>
    <h1>{album.artists[0].name}</h1>
    <Image src={album.images[0].url} alt={`${album.name}`} width={album.images[0].width} height={album.images[0].width}/>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {tracks?.items.map((t, i) => <Track key={i} track={t}/>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}