import { getArtist } from "@/app/lib/actions";
import Album from "@/app/ui/Album";
import Image from "next/image";

export default async function Page( { params } ){
  
  const { id } =  params;
  

  const [artist, albums] = await getArtist(id);
  return (
    <>
    <p>artist details go here</p>
    <h1>{artist.name}</h1>
    <Image src={artist.images[0].url} alt={`${artist.name}`} width={artist.images[0].width} height={artist.images[0].width}/>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {albums?.items.map((a, i) => <Album key={i} album={a}/>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}