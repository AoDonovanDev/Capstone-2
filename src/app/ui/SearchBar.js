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
      </div>
        <div className="Tabs">
          <li className={`tab tab-bordered ${searchType==='track' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/track')}>Tracks</li> 
          <li className= {`tab tab-bordered ${searchType==='artist' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/artist')}>Artists</li> 
          <li className={`tab tab-bordered ${searchType==='album' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/album')}>Albums</li>
        </div>
    </div>
  );
};