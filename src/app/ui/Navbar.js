import Tabs from "./Tabs"
import SearchBar from "./SearchBar";
import { useState } from "react"


export default function Navbar({user, logOut, setLogin, setSignUp, setSearchResults}){

  const [active, setActive] = useState([0,1,0]);

  function tab(i){
    const copy = [...active];
    const currentTabState = copy.map((t, idx) => t = idx===i ? 1 : 0 );
    setActive(currentTabState);
  }

  const select = active.indexOf(1)
  //useRef maybe used here
  const map = {
    0: 'track',
    1: 'artist',
    2: 'album'
  };

  async function search(formData){
    const {type, query} = formData;
    console.log(formData);
    const response = await fetch(`http://127.0.0.1:3000/search/${type}/${query}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    setSearchResults({...searchResults})
    
  }

  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Soundrake</a>
        </div>
        <div className="navbar-center"> 
          {user ? <div><Tabs active={active} tab={tab}/> <SearchBar type={map[select]} search={search}/></div>: <></>}
        </div> 
        <div className="navbar-end">
          <ul>
          {user ? <button onClick={()=>logOut()}>logout</button> : 
          <div className="menu menu-horizontal px-1">
            <li><button onClick={()=>setLogin()}>login</button></li>
            <li><button onClick={() =>setSignUp()}>signup</button></li>
          </div>
          }
          </ul>
        </div>
    </div>
  )
}