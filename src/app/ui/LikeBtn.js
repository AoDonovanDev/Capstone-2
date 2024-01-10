'use client';

import { useContext } from "react";
import { userContext } from "../userContext";
import Image from "next/image";
import { addLike, removeLike } from "../lib/actions";


export default function LikeBtn( {listItem} ){

  const { userState, setUserState } = useContext(userContext);

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
  
  return (
    <button className="btn btn-ghost" onClick={() => updateLikes(user?.value, listItem.id)}>
      <Image src={likesMap?.[listItem.id] ? "/headphonesShiny.png" : "/headphonesBlack.png"} alt="headphones" height={40} width={40}/>
    </button>
  )
}