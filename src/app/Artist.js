import Image from "next/image"
export default function Artist( { artist } ){
  console.log(artist)
  return (
     <div className="Artist">
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
                      <Image src={`${artist.images.length ? artist.images[0].url : ''}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{artist.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {artist.name}
              </td>
              <td>AVG USER RATING</td>
              <th>
                <button className="btn btn-ghost btn-xs">RATE</button>
              </th>
            </tr>
   </div>
  )
}