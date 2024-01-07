'use client';

import { itemContext } from "@/app/itemContext";
import { getTrack } from "@/app/lib/actions";
import { useState, useEffect } from "react";
import Track from "@/app/ui/Track";

export default function Page( { params } ){

  const [track, setTrack] = useState('')
  const { id } = params;

  useEffect(() => {
    (async () => {
      const track = await getTrack(id)
      setTrack(track)
    })()
  }, [id])
  
  if(!track) return <></>

  return (
    <itemContext.Provider value={track}>
      <div className="SearchResults">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
            </thead>
            <tbody>
              <Track/>
            </tbody>
            <tfoot>
            </tfoot>
          </table>
        </div>
      </div>
    </itemContext.Provider>
  )
}