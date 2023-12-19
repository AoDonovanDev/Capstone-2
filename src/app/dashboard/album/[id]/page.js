'use client';

import { getAlbum } from "@/app/lib/actions";
import Track from "@/app/ui/Track";
import Image from "next/image";
import { itemContext } from "@/app/itemContext";
import { useState, useEffect } from "react";

export default function Page( { params } ){
  
  const { id } =  params;
  const [pageData, setPageData] = useState('')

  useEffect(() => {
    (async () => {
      const [album, tracks] = await getAlbum(id);
      setPageData([album, tracks])
    })();
  }, [id])

  const [album, tracks] = pageData;

  if(!pageData) return <></>

  return (
    <>
    <div className="flex flex-col items-center">
      <h1>{album.name}</h1>
      <h1>{album.artists[0].name}</h1>
      <Image src={album.images[0].url} alt={`${album.name}`} width={album.images[0].width} height={album.images[0].width} className="object-center"/>
    </div>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {tracks?.items.map((t, i) => <itemContext.Provider key={i} value={t}><Track track={t}/></itemContext.Provider>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}