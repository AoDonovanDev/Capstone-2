'use client';

import { usePathname, useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { debounce } from "../lib/utils";

export default function SearchBar(){

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const { replace } = useRouter();
  const { searchType } = params;

  function handleChange(term){
    const params = new URLSearchParams(searchParams)
    if(term){
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.delete('page');
    replace(`${pathName}?${params.toString()}`)
  };

  const debouncedHandleChange = debounce(handleChange)

  function tab(newPathName){
    replace(newPathName);
    document.getElementById('query').value = '';
  }

  return (
    <div className="SearchGroup">
      <div className="join">
        <input className="input input-bordered join-item" 
              placeholder={`search ${searchType}s...`}
              name="query"
              id="query"
              defaultValue={searchParams.get('query')?.toString()}
              onChange={(e)=>debouncedHandleChange(e.target.value)}/>
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
        <div className="Tabs">
          <li className={`tab tab-bordered ${searchType==='track' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/track')}>Tracks</li> 
          <li className= {`tab tab-bordered ${searchType==='artist' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/artist')}>Artists</li> 
          <li className={`tab tab-bordered ${searchType==='album' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/album')}>Albums</li>
        </div>
    </div>
  );
};