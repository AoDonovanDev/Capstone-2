'use client'
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useContext } from "react"
import { userContext } from "../userContext"
import { logout } from "../lib/actions"




export default function Navbar(){

  const { userState  } = useContext(userContext)
  return (
  
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Soundrake</a>
        </div>
        <div className="navbar-center"> 
          {userState && <div> <SearchBar /></div>}
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