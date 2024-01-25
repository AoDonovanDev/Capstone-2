'use client'
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useContext } from "react"
import { userContext } from "../userContext"
import { logout } from "../lib/actions"
import { useParams } from "next/navigation"
import { spotifyAuthReq } from "../lib/actions"




export default function Navbar(){

  const { token  } = useContext(userContext);
  const params = useParams();

  const responsiveSearchbar = params.searchType ? <div><SearchBar /></div> : <Link href="/dashboard/search/track">Search</Link>;
      
  return (
  
    <div className="navContainer">
      <div className="navbar bg-base-100">
            <div className="navbar-start">
              <Link className="btn btn-ghost normal-case text-xl manu" href="/dashboard">Soundrake</Link>
            </div>
            <div className="searchLgScreen navbar-center hidden md:flex">
              {responsiveSearchbar}
            </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box pr-6" style={{backgroundColor: '#442b63'}}>
                <li className="m-1 md:m-3"><button className="w-full font-bold underline text-md" onClick={() => logout()} >Log out</button></li>
                { !token && <li className="m-1 md:m-3"><button className="btn btn-info w-full" onClick={()=>spotifyAuthReq()}>Enable Player</button></li> }
              </ul>
            </div>
          </div>
      </div>
      <div className="searchSmScreen flex w-full justify-center md:hidden">
        {responsiveSearchbar}
      </div>
    </div>
  )
}