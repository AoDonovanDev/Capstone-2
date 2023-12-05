'use client';

import Track from "./Track";
import Artist from "./Artist"
import Album from "./Album"
import { useContext } from "react";
import { userContext } from "../userContext";


export default function SearchResults( {searchResults} ){
const {track, tracks, artists, albums} = searchResults ? searchResults : {};
const user = useContext(userContext)
  return (
    <div className="SearchResults">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          {user &&
          <tbody>
            {tracks?.items.map((t, i) => <Track key={i} track={t} />)}
            {track && <Track track={track}/>}
            {artists?.items.map((a, i) => <Artist key={i} artist={a} />)}
            {albums?.items.map((a, i) => <Album key={i} album={a}/>)}
          </tbody>
          }
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
      
    </div>
  )
}
