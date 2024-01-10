 'use client';
 import { experimental_useFormStatus as useFormStatus } from 'react-dom';
 import { getAverage } from "../lib/actions";
 import { setStateContext } from '../setStateContext';
 import { useContext } from 'react';


 
 export default function RatingSubmitBtn( { modal, userState, state, sp_id } ){
    const { pending, data } = useFormStatus();
    const setAvgRating = useContext(setStateContext)

    if(pending) {
      const comments = data.get('comments');
      const starRating = parseInt(data.get('starRating'));
      const img_url = data.get('img_url');
      const name = data.get('name');
      userState.ratingsMap[sp_id] = {
        comments,
        starRating,
        sp_id,
        img_url,
        name,
      }
  
      setTimeout(async()=> {
        if(!modal) return;
        const avg = await getAverage(sp_id);
        document.getElementById(sp_id).close();
        setAvgRating(avg)
      }, 10)
    
    }

    return (
      <div>
        { modal ? <button className="btn btn-success" disabled={pending}>{state.existing ? 'Update' : 'Save'} </button> :
          <button className="btn btn-success" disabled={pending}>UPDATE</button> }
      </div>
    )
  }