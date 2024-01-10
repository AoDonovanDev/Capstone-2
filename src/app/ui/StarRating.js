'use client';
import { useState } from "react";
import { experimental_useFormState as useFormState} from 'react-dom'
import { submitRating } from "../lib/actions";
import { updateRating } from "../lib/actions";
import { userContext } from "../userContext"; 
import { itemContext } from "../itemContext";
import { useContext } from "react";
import Stars from "./Stars";
import RatingSubmitBtn from "./RatingSubmitBtn";


export default function StarRating( { existing } ) {
  const { userState, setUserState } = useContext(userContext);
  const item = useContext(itemContext);
  
  const [rating, setRating] = useState(existing?.starRating ?? -1);

  console.log('userState in starRating component', userState)
  const initialState = {
    message: null,
    token: userState?.user.value,
    sp_id: item.id,
    rating: existing
  };
  
  const ratingAction = existing ? updateRating : submitRating;

  const [state, formAction] = useFormState(ratingAction, initialState);

  function clickHandler(r){
    setRating(r+1);
  }

  function clearRating(){
    setRating(-1);
  }

  const images = item.images || item.album?.images;
  return (
    <div className="StarRatingForm">
      <div className="flex">
        <Stars rating={rating} clickHandler={clickHandler}/>
        <button className="btn btn-square btn-ghost btn-xs self-center" onClick={clearRating}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <form action={formAction}>
        <input type="number" value={rating} hidden={true} name="starRating" readOnly={true} max={5}/>
        <input type="text" value={item.id} hidden={true} name="sp_id" readOnly={true}/>
        <input type="text" value={item.name} hidden={true} name="name" readOnly={true}/>
        {(images && images.length) ? <input type="text" value={images[0].url} hidden={true} name="img_url" readOnly={true}/> : <></>}
        <h1>{item.name} {item.artists && `by ${item.artists[0].name}`}</h1>
        <div className="flex flex-row">
          <textarea className="textarea textarea-secondary grow" 
                    placeholder="do it slap?" 
                    name="comments" 
                    defaultValue={existing?.comments} />  
        </div>
        <div className="modal-action">
          <RatingSubmitBtn modal={true} state={state} sp_id={item.id} userState={userState} />
          <button type="button" className="btn" onClick={()=>document.getElementById(item.id).close()}>Close</button>
        </div>
      </form>
    </div>
  )
}