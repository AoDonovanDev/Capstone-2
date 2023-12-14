'use client';

import Image from "next/image"
import Link from "next/link"
import LikeBtn from "./LikeBtn"

export default function Album( { album } ){
  return (
     
            <tr className="Album">
              <th>
                <label>
                  <LikeBtn listItem={album}/>
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image src={`${album.images.length ? album.images[0].url : '/next.svg'}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{album.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <Link href={`/dashboard/album/${album.id}`}>{album.name}</Link>
              </td>
              <td>AVG USER RATING</td>
              <th>
                <button className="btn btn-ghost btn-xs">RATE</button>
              </th>
            </tr>
   
  )
}