import { useState } from "react"

export default function SearchBar( { type, search } ){

  const [formData, setFormData] = useState({
    type,
    query: ''
  });

  function handleChange(e){
    const {name, value} = e.target;
    setFormData(fData => ({
      type,
      [name]: value
    }));
  };

  
  

  return (
    <div className="join">
      <input className="input input-bordered join-item" 
             placeholder={type}
             name="query"
             id="query"
             value={formData.query}
             onChange={handleChange}/>
      <button className="btn btn-ghost btn-circle" onClick={() => search(formData)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  );
};