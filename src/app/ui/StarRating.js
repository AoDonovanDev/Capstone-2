'use client';
import { useState } from "react";
import Image from "next/image";
import { experimental_useFormState as useFormState } from 'react-dom';
import { submitRating } from "../lib/actions";
import { userContext } from "../userContext"; 
import { itemContext } from "../itemContext";
import { useContext } from "react";


export default function StarRating() {
  const { userState } = useContext(userContext);
  const item = useContext(itemContext);
  const existing = userState?.ratingsMap[item.id]
  console.log('rated?', existing);
  const [rating, setRating] = useState(existing?.starRating ?? -1);

 
  const initialState = {
    message: null,
    token: userState.user.value,
    sp_id: item.id
  };

  const [state, formAction] = useFormState(submitRating, initialState);


  function clickHandler(r){
    console.log(state)
    setRating(r);
  }

  function clearRating(){
    setRating(-1);
  }

  const stars = [];

  for(let i = 0; i < 5; i++){
    stars.push(
        <li key={i} onClick={()=>clickHandler(i)}>
          <a>
            <Image src={i <= rating ? "/starGold.png" : "/starBlank.png"} height={30} width={30} alt={'star rating'}/>
          </a>
        </li>
    )
  }
  return (
    <div className="StarRatingForm">
    <ul className="menu menu-horizontal bg-base-100 rounded-box">
      {stars}
    </ul>
    <button className="btn btn-square btn-ghost btn-xs" onClick={clearRating}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <form action={formAction}>
      <input type="number" value={rating+1} hidden={true} name="starRating" readOnly={true}/>
      <input type="text" value={item.id} hidden={true} name="sp_id" readOnly={true}/>
      <h1>{item.name} by {item.artists[0].name} {state.rating?.rating_id}</h1>
      <div className="flex flex-row">
        <textarea className="textarea textarea-secondary grow" placeholder="do it slap?" name="comments" defaultValue={existing && existing.comments} />
      </div>
      <div className="modal-action">
        <button className="btn btn-success">Save</button>
        <button type="button" className="btn" onClick={()=>document.getElementById(item.id).close()}>Close</button>
      </div>
    </form>
    </div>
  )
}