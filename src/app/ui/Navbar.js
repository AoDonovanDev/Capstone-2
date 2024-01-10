'use client'
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useContext } from "react"
import { userContext } from "../userContext"
import { logout } from "../lib/actions"
import { useParams } from "next/navigation"
import { spotifyAuthReq } from "../lib/actions"




export default function Navbar(){

  const { userState, token  } = useContext(userContext)
  const params = useParams()

  return (
  
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="btn btn-ghost normal-case text-xl" href="/dashboard">Soundrake</Link>     
          { !token && <div className="enablePlayerBtn">
            <button className="btn btn-success" onClick={()=>spotifyAuthReq()}>Enable Player</button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                <div tabIndex={0} className="card-body">
                  <p>Requires Spotify Premium account</p>
                </div>
              </div>
            </div>
          </div>}
        </div>
        <div className="navbar-center"> 
          {userState && params.searchType && <div> <SearchBar /></div>}
          {!params.searchType && <Link href="/dashboard/search/track">Search</Link>}
        </div> 
        <div className="navbar-end">
          <ul>
          {userState ? <button onClick={() => logout()} >logout</button> : 
          <div className="menu menu-horizontal px-1">
            <li><Link href="/login">login</Link></li>
            <li><Link href="/signup">signup</Link></li>
          </div>
          }
          </ul>
        </div>
    </div>
  )
}