import { useState } from "react";


export default function Pagination(searchResults) {
  const [pageIndex, setPageIndex] = useState([0,9]);


  function nextPage(){
    setPage(p => {
      const newPageIndex = [pageIndex[0]+9, pageIndex[1]+9];
      while(!searchResults[newPage[1]]){
        newPage[1] --;
      }
      setPageIndex(newPageIndex)
    })
  }


  return (
    <div className="join grid grid-cols-2">
      <button className="join-item btn btn-outline">Previous page</button>
      <button className="join-item btn btn-outline" onClick={nextPage}>Next</button>
    </div>
  )
}