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
  const [avgRating, setAvgRating] = useState(track.avg); 
  const [localPlaybackState, setLocalPlaybackState] = useContext(setStateContext);
  
  
  async function togglePlay(access_token, sp_id){
    let state = await player.getCurrentState();  
    const current = state.track_window.current_track.id;
    if(state.paused && current === sp_id){
      //current track is paused, we pressed play on the same track
      console.log("resuming play")
      playTrack(access_token, sp_id, state.position);
      setLocalPlaybackState({
        isPlaying: true,
        currentTrack: sp_id
      })
    } else if(current !== sp_id) {
      //we jumped to a different track 
      console.log("jumped to a new track" )
      playTrack(access_token, sp_id);
      setLocalPlaybackState({
        isPlaying: true,
        currentTrack: sp_id
      })
    } else {
      //we are pausing the current track
      console.log("we are pausing")
      player.togglePlay();
      setLocalPlaybackState({
        isPlaying: false,
        currentTrack: sp_id
      })
    }
  }

  return (
    <tr className='Track h-1/12'>
      <th>
        <label>
          <LikeBtn listItem={track}/>
        </label>
      {token && <button className="btn btn-ghost" onClick={()=>togglePlay(token, track.id)}>{
      localPlaybackState.isPlaying && localPlaybackState.currentTrack == track.id ? 
      <Image src={"/spfyGreenPause.svg"} height={40} width={40} alt="pauseBtn"/> :
      <Image src={"/spfyGreenPlay2.svg"} height={40} width={40} alt="playBtn"/>}</button>}
      </th>
      <td className="md:flex">
        <div className="flex items-center space-x-3 ">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {track.album && <Image src={`${track.album.images[0].url}`} width={100} height={100} alt="track artist photo" />}
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