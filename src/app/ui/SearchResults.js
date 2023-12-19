'use client';

import Track from "./Track";
import Artist from "./Artist"
import Album from "./Album"
import { useContext } from "react";
import { userContext } from "../userContext";
import { itemContext } from "../itemContext";
import { v4 as uuidv4 } from 'uuid';


export default function SearchResults( {searchResults, searchType} ){
/* const {track, tracks, artists, albums} = searchResults ? searchResults : {}; */
/* const paginationList = tracks || artists || albums; */
  const { userState } = useContext(userContext);
  console.log(searchResults)
  return (
    <div className="SearchResults">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          </thead>
          {userState &&
          <tbody>

            {searchResults?.items.map(item => {
              const searchTypeMap = {
                'track': <Track />,
                'artist': <Artist />,
                'album': <Album />
                }
                return <itemContext.Provider value={item} key={uuidv4()}>{searchTypeMap[searchType]}</ itemContext.Provider>
              }
            )}
            {/* {tracks?.items.map((t, i) => <itemContext.Provider value={t} key={uuidv4()}><Track/></ itemContext.Provider>)}
            {track && <itemContext.Provider value={track}><Track/></ itemContext.Provider>}
            {artists?.items.map((a, i) => <Artist key={i} artist={a} />)}
            {albums?.items.map((a, i) => <Album key={i} album={a}/>)} */}
          </tbody>
          }
          <tfoot>
          </tfoot>
          
        </table>
    </div>
      
    </div>
  )
}
