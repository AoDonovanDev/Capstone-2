'use client';

import Image from "next/image"
import Link from "next/link"
import LikeBtn from "./LikeBtn"
import { useContext, useState } from "react";
import { itemContext } from "../itemContext";
import { setStateContext } from "../setStateContext";
import RatingModal from "./RatingModal";

export default function Artist(){

  const artist = useContext(itemContext);
  const [avgRating, setAvgRating] = useState(artist.avg);


  return (
    <tr className="Artist">
      <th>
        <label>
          <LikeBtn listItem={ artist }/>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image src={`${artist.images.length ? artist.images[0].url : '/next.svg'}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{artist.name}</div>
          </div>
        </div>
      </td>
      <td>
          <Link href={`/dashboard/artist/${artist.id}`}>{artist.name}</Link>
      </td>
      <td>AVG USER RATING: {avgRating}</td>
      <th>
        <setStateContext.Provider value={setAvgRating}>
          <RatingModal />
        </setStateContext.Provider>
      </th>
    </tr>
  )
}