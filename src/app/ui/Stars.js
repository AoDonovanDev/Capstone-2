'use client'

import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

export default function Stars({rating, clickHandler, utils}){

  const stars = [];
  

  for(let i = 0; i < 5; i++){
    stars.push(
        <li key={uuidv4()} onClick={clickHandler ? ()=>clickHandler(i) : null}>
          <a>
            <Image src={i < rating ? "/starGold.png" : "/starBlank.png"} height={30} width={30} alt={'star rating'}/>
          </a>
        </li>
    )
  }
  return (
    <ul className={`menu-horizontal rounded-box w-5/6 grid grid-rows-1 grid-flow-row grid-cols-5 ${utils && utils} ${clickHandler ? 'menu' : ''}`}>
      {stars}
    </ul>
  )
}