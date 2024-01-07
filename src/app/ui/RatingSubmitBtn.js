 'use client';
 import { experimental_useFormStatus as useFormStatus } from 'react-dom';

 
 export default function SubmitBtn( { modal, userState, setUserState, state, sp_id } ){
    const { pending, data } = useFormStatus();

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
        name
      }
      setTimeout(()=> {
        setUserState({...userState})
      }, 10)
    
    }

    return (
      <div>
        { modal ? <button className="btn btn-success" disabled={pending}>{state.existing ? 'Update' : 'Save'} </button> :
          <button className="btn btn-success" disabled={pending}>UPDATE</button> }
      </div>
    )
  }