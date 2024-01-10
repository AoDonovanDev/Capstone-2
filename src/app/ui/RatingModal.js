'use client';

import StarRating from "./StarRating"
import { useContext } from "react";
import { userContext } from "../userContext";
import { itemContext } from "../itemContext";

export default function RatingModal(){

  const item = useContext(itemContext);
  const { userState } = useContext(userContext)
  const existing = userState?.ratingsMap?.[item.id]


  return (
    <div className="RatingModal">
      <button className="btn w-4/5" onClick={()=>document.getElementById(item.id).showModal()}>{existing ? 'UPDATE' : 'RATE'}</button>
      <dialog id={item.id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <StarRating existing={existing} />
        </div>
      </dialog>
    </div>
  )
}