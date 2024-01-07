'use client'
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useContext } from "react"
import { userContext } from "../userContext"
import { logout } from "../lib/actions"
import { useParams } from "next/navigation"




export default function Navbar(){

  const { userState  } = useContext(userContext)
  const params = useParams()

  return (
  
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="btn btn-ghost normal-case text-xl" href="/dashboard">Soundrake</Link>
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