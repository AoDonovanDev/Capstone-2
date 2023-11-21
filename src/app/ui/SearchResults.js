import Image from "next/image";
import Track from "./Track";
import Artist from "./Artist"
import Album from "./Album"

export default function SearchResults( { searchResults } ){

  const {tracks, artists, albums} = searchResults;
  
  console.log(artists)
  

  return (
    <div className="SearchResults">
      
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          </thead>
          <tbody>
            {tracks?.items.map((t, i) => <Track key={i} track={t} />)}
            {artists?.items.map((a, i) => <Artist key={i} artist={a} />)}
            {albums?.items.map((a, i) => <Album key={i} album={a}/>)}
          </tbody>
          {/* foot */}
          <tfoot>
          </tfoot>
          
        </table>
    </div>
      
    </div>
  )
}
