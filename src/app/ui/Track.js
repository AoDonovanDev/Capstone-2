'use client';

import Image from "next/image"
import Link from "next/link"
import LikeBtn from "./LikeBtn";
import { playTrack } from "../lib/actions";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../userContext";
import { itemContext } from "../itemContext";
import { setStateContext } from "../setStateContext";
import RatingModal from "./RatingModal";


export default function Track(){
  const { player, token } = useContext(userContext);
  const track = useContext(itemContext);
  const [avgRating, setAvgRating] = useState(track.avg) 
  
  async function togglePlay(access_token, sp_id){
    console.log(token, player)
    const state = await player.getCurrentState();
    const current = state.track_window.current_track.id;
    if(state.paused && current === sp_id){
      playTrack(access_token, sp_id, state.position);
    } else if(current !== sp_id) {
      playTrack(access_token, sp_id);
    } else {
      player.togglePlay();
    }
  }

  return (
    <tr className='Track h-1/12'>
      <th>
        <label>
          <LikeBtn listItem={track}/>
        </label>
      {token && <button className="btn btn-success" onClick={()=>togglePlay(token, track.id)}>Play</button>}
      </th>
      <td className="md:flex">
        <div className="flex items-center space-x-3 ">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {track.album && <Image src={`${track.album.images[0].url}`} width={100} height={100} alt="track artist photoa" />}
            </div>
          </div>
          <div className="h-12 w-24 overflow-scroll overscroll-contain md:overflow-hidden md:h-auto md:w-auto">
            <Link href={`/dashboard/track/${track.id}`} className="font-bold">{track.name}</Link>
          </div>
        </div>
      </td>
      <td>
        <Link href={`/dashboard/artist/${track.artists[0].id}`}>{track.artists[0].name}</Link>
      </td>
      <td>AVERAGE RATING: {avgRating}</td>
      <th>
        <setStateContext.Provider value={setAvgRating}>
          <RatingModal/>
        </setStateContext.Provider>
      </th>
    </tr>
   
  )
}