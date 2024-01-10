'use client';


import { getAlbum } from "@/app/lib/actions";
import Track from "@/app/ui/Track";
import Image from "next/image";
import { itemContext } from "@/app/itemContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';


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
      <h1 className="font-bold">{album.name}</h1>
      <p className="italic">an album by</p>
      <Link href={`/dashboard/artist/${album.artists[0].id}`}><h1 className="font-bold">{album.artists[0].name}</h1></Link>
      <Image src={album.images[0].url} alt={`${album.name}`} width={album.images[0].width} height={album.images[0].width} className="object-center"/>
    </div>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {tracks?.items.map((t, i) => <itemContext.Provider key={uuidv4()} value={t}><Track/></itemContext.Provider>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}