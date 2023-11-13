import Image from "next/image"

export default function Track({track}){
  console.log(track)
  return (
   <div className="Track">
      {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image src={`${track.album.images[0].url}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{track.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {track.artists[0].name}
              </td>
              <td>AVG USER RATING</td>
              <th>
                <button className="btn btn-ghost btn-xs">RATE</button>
              </th>
            </tr>
   </div>
  )
}