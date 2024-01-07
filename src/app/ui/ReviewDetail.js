'use client'

import Stars from "./Stars"
import Image from "next/image"
import { userContext } from "../userContext"
import { useContext, useState } from "react"
import { useParams } from "next/navigation"
import { updateRating } from "../lib/actions"
import { experimental_useFormState as useFormState} from 'react-dom'
import RatingSubmitBtn from "./RatingSubmitBtn"


export default function ReviewDetail(){

  const { userState, setUserState } = useContext(userContext);
  const { ratingsMap } = userState;
  const { id } = useParams();
  const review = ratingsMap[id];
  const [rating, setRating] = useState(review.starRating)

  const initialState = {
    message: null,
    token: userState.user.value,
    sp_id: id,
    detail: true
  };

  const [state, formAction] = useFormState(updateRating, initialState);

  function clickHandler(r){
    console.log('in rating clicker', r)
    setRating(r+1)
  }

  console.log(review, ratingsMap)
  return (
    <div className="ReviewDetail flex flex-col items-center">
      <Image alt={review.name} src={review.img_url} width={200} height={200} className="w-full h-auto lg:w-1/3 lg:h-1/3"/>
      <Stars rating={rating} clickHandler={clickHandler} utils={"w-full h-auto lg:w-1/3 lg:h-1/3"}/>
      <form action={formAction} className="w-full md:w-1/4">
        <input type="number" value={rating} hidden={true} name="starRating" readOnly={true} max={5}/>
        <input type="text" value={review.sp_id} hidden={true} name="sp_id" readOnly={true}/>
        <input type="text" value={review.name} hidden={true} name="name" readOnly={true}/>
        <input type="text" value={review.img_url} hidden={true} name="img_url" readOnly={true}/>
        <h1>More thoughts on {review.name}?</h1>
        <div className="flex flex-row">
          <textarea className="textarea textarea-secondary grow mb-4" 
                    placeholder="do it slap?" 
                    name="comments" 
                    defaultValue={review.comments} />  
        </div>
        <RatingSubmitBtn modal={false} state={state} sp_id={id} userState={userState} setUserState={setUserState}/>
      </form>
    </div>
  )
}