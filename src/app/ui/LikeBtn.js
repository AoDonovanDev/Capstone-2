'use client';

import { useContext } from "react";
import { userContext } from "../userContext";
import Image from "next/image";
import { addLike, removeLike } from "../lib/actions";


export default function LikeBtn( {listItem} ){

  const { userState, setUserState, token } = useContext(userContext);

  const { user, likesMap } = userState;

  async function updateLikes(token, sp_id){

    const newState = {...userState};

    if(newState.likesMap[sp_id]){
      delete newState.likesMap[sp_id];
      await removeLike(token, sp_id);
    } else {
      newState.likesMap[sp_id] = sp_id;
      await addLike(token, sp_id);
    }
    setUserState(newState)
  }
  
  const like_id = token ? listItem.external_ids?.isrc : listItem.id;
  return (
    <button className="btn btn-ghost" onClick={() => updateLikes(user?.value, like_id)}>
      <Image src={likesMap?.[like_id] ? "/headphonesShiny.png" : "/headphonesBlack.png"} alt="headphones" height={40} width={40}/>
    </button>
  )
}