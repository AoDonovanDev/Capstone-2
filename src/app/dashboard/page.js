'use client';

import { useContext, useState } from "react";
import { userContext } from "../userContext";
import ReviewCard from "../ui/ReviewCard"
import { v4 as uuidv4 } from 'uuid';

export default function Page(){
  const { userState, setPlayer } = useContext(userContext);
  const map = userState.ratingsMap;
  const likes = userState.likesMap;
  const keys = userState ? Object.keys(map) : []

  return (
    <div>
      <div className="collapse bg-base-200">
        <input type="checkbox" name="my-accordion-1" className="w-1/12"/> 
        <div className="collapse-title text-xl font-medium">
            <h1>My Reviews</h1>
        </div>
        <div className={`collapse-content grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}> 
          {keys.length && keys.map( r => <ReviewCard key={uuidv4()} img_url={map[r].img_url} starRating={map[r].starRating} comments={map[r].comments} name={map[r].name} id={r}/>)}
        </div>
      </div>
      {/* <div className="collapse bg-base-200">
        <input type="checkbox" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium">
            <h1>My Likes</h1>
        </div>
        <div className="collapse-content"> 
          <p>hello</p>
        </div>
      </div> */}
    </div>

  )
}