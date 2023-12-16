'use client';

import StarRating from "./StarRating"
import { useContext } from "react";
import { itemContext } from "../itemContext";

export default function RatingModal(){

  const listItem = useContext(itemContext);

  return (
    <div className="RatingModal">
      <button className="btn" onClick={()=>document.getElementById(listItem.id).showModal()}>RATE</button>
      <dialog id={listItem.id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <StarRating />
        </div>
      </dialog>
    </div>
  )
}