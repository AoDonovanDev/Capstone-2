import Image from "next/image"
import Stars from "./Stars"
import Link from "next/link"

export default function ReviewCard({name, img_url, starRating, comments, id}){
  return (
    <div className="card w-96 glass">
      {img_url && <figure><Image src={img_url} alt={`${name}`} height={200} width={400}/></figure>}
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex flex-row justify-start">
          <Stars rating={starRating}/>
        </div>
        <p>{comments}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" href={`/dashboard/reviews/${id}`}>Update</Link>
        </div>
      </div>
    </div>
  )
}