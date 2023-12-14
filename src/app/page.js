"use client"
import { spotifyAuthReq } from './lib/actions';
import Navbar from "./ui/Navbar"

export default function Page() {
  
  return (
    <div className='Home'>
      <p>root page</p>
      <Navbar />
      <button className="btn btn-error" onClick={()=>spotifyAuthReq()}>log in with spotify</button>
    </div>
 
  )
}
