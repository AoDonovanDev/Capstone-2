'use client';

import Image from "next/image"
import Link from "next/link"
import LikeBtn from "./LikeBtn";
import { playTrack } from "../lib/actions";
import { useContext } from "react";
import { userContext } from "../userContext";
import RatingModal from "./RatingModal";


export default function Track({track}){
  const { userState, player, token } = useContext(userContext)
  
  async function togglePlay(access_token, sp_id){
    const state = await player.getCurrentState();
    const current = state.track_window.current_track.id;
    console.log(state);
    if(state.paused && current === sp_id){
      playTrack(access_token, sp_id, state.position);
    } else if(current !== sp_id) {
      playTrack(access_token, sp_id);
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
              {token && <button className="btn btn-success" onClick={()=>togglePlay(token, track.id)}>Play</button>}
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
                <RatingModal />
              </th>
            </tr>
   
  )
}