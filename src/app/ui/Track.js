'use client';

import Image from "next/image"
import Link from "next/link"
import LikeBtn from "./LikeBtn";
import { playTrack } from "../lib/actions";
import { useContext } from "react";
import { userContext } from "../userContext";


export default function Track({track}){
  const { userState, player } = useContext(userContext)
  
  async function togglePlay(access_token, sp_id){
    const state = await player.getCurrentState();
    console.log(state);
    if(state.paused){
      playTrack(access_token, sp_id, state.position);
    } else {
      player.togglePlay();
    }
  }

  return (
            <tr className='Track'>
              <th>
                <label>
                  <LikeBtn listItem={track}/>
                </label>
              <button className="btn btn-success" onClick={()=>togglePlay(userState.access_token, track.id)}>Play</button>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      {track.album && <Image src={`${track.album.images[0].url}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />}
                    </div>
                  </div>
                  <div>
                    <Link href={`/dashboard/track/${track.id}`}><div className="font-bold">{track.name}</div></Link>
                  </div>
                </div>
              </td>
              <td>
                <Link href={`/dashboard/artist/${track.artists[0].id}`}>{track.artists[0].name}</Link>
              </td>
              <td>AVG USER RATING</td>
              <th>
                <button className="btn btn-ghost btn-xs">RATE</button>
              </th>
            </tr>
   
  )
}