import Image from "next/image"
import Link from "next/link"

export default function Album( { album } ){
  return (
     
            <tr className="Album">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image src={`${album.images.length ? album.images[0].url : ''}`} width={100} height={100} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{album.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <Link href={`/search/album/${album.id}/detail`}>{album.name}</Link>
              </td>
              <td>AVG USER RATING</td>
              <th>
                <button className="btn btn-ghost btn-xs">RATE</button>
              </th>
            </tr>
   
  )
}