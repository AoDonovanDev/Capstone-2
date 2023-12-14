import StarRating from "./StarRating"

export default function RatingModal(){

  return (
    <div className="RatingModal">
      <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>RATE</button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <StarRating />
        </div>
      </dialog>
    </div>
  )
}