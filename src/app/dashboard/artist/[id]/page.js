'use client'

import { getArtist } from "@/app/lib/actions";
import Album from "@/app/ui/Album";
import Image from "next/image";
import { itemContext } from "@/app/itemContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Page( { params } ){
  
  const { id } =  params;
  const [pageData, setPageData] = useState('');
  

  useEffect(() => {
    (async () => {
      const [artist, albums] = await getArtist(id);
      setPageData([artist, albums])
    })();
  }, [id]);
 
  const [artist, albums] = pageData;

  if(!pageData) return <></>;

  return (
    <>
    <div className="flex flex-col items-center">
      <h1>{artist.name}</h1>
      {artist.images.length ? <Image src={artist.images[0].url} alt={`${artist.name}`} width={artist.images[0].width} height={artist.images[0].width}/> : <></>}
    </div>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {albums?.items.map((a, i) => <itemContext.Provider key={uuidv4()} value={a}><Album album={a}/></itemContext.Provider>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}