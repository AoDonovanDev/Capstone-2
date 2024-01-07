'use client'
import { usePathname, useRouter } from "next/navigation"

export default function Tabs(){
  const searchType  = usePathname().split('/')[3];
  const { replace } = useRouter();
  console.log(searchType)

  function tab(pathName){
    replace(pathName);
  }

  return (
    <div className="Search">
      <li className={`tab tab-bordered ${searchType==='track' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/track')}>Tracks</li> 
      <li className= {`tab tab-bordered ${searchType==='artist' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/artist')}>Artists</li> 
      <li className={`tab tab-bordered ${searchType==='album' ? 'tab-active': ''}`} onClick={()=>tab('/dashboard/search/album')}>Albums</li>
    </div>
    
  )
}