'use client'

import { getArtist } from "@/app/lib/actions";
import Album from "@/app/ui/Album";
import Image from "next/image";
import { userContext } from "@/app/userContext";
import { itemContext } from "@/app/itemContext";
import { useContext, useEffect, useState } from "react";

export default function Page( { params } ){
  
  const { id } =  params;
  const [pageData, setPageData] = useState('');
  const { userState } = useContext(userContext);
  
  console.log(userState)

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
    <p>artist details go here</p>
    <h1>{artist.name}</h1>
    <Image src={artist.images[0].url} alt={`${artist.name}`} width={artist.images[0].width} height={artist.images[0].width}/>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {albums?.items.map((a, i) => <itemContext.Provider key={i} value={a}><Album album={a}/></itemContext.Provider>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
    </>
  )
}