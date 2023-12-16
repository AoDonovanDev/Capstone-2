'use client';

import Track from "./Track";
import Artist from "./Artist"
import Album from "./Album"
import { useContext } from "react";
import { userContext } from "../userContext";
import { itemContext } from "../itemContext";


export default function SearchResults( {searchResults} ){
const {track, tracks, artists, albums} = searchResults ? searchResults : {};
const { userState } = useContext(userContext)
console.log(userState.ratings)

  return (
    <div className="SearchResults">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          </thead>
          {userState &&
          <tbody>
            {tracks?.items.map((t, i) => <itemContext.Provider value={t} key={i}><Track track={t}/></ itemContext.Provider>)}
            {track && <Track track={track}/>}
            {artists?.items.map((a, i) => <Artist key={i} artist={a} />)}
            {albums?.items.map((a, i) => <Album key={i} album={a}/>)}
          </tbody>
          }
          <tfoot>
          </tfoot>
          
        </table>
    </div>
      
    </div>
  )
}
