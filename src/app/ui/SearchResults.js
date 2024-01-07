'use client';

import Track from "./Track";
import Artist from "./Artist"
import Album from "./Album"
import { useContext, useState, useEffect } from "react";
import { userContext } from "../userContext";
import { itemContext } from "../itemContext";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function SearchResults( {searchResults, searchType} ){
  const { userState } = useContext(userContext);
  
  const [pageIndex, setPageIndex] = useState([0,9]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const page = searchParams.get('page')
  
  useEffect(() => {
    if(!page){
      setPageIndex([0, 9])
    }
  }, [page])

  function nextPage(){
    const params = new URLSearchParams(searchParams);
    params.set('page', parseInt(params.get('page'))+1 || 1);
    replace(`${pathName}?${params.toString()}`)

    setPageIndex(p => {
      const newPageIndex = [pageIndex[0]+9, pageIndex[1]+9];
      if(searchResults.items[newPageIndex[1]] === undefined){
        newPageIndex[1] = searchResults.items.length-1
      }
      return newPageIndex;
    })
  }

  function prevPage(){
    const params = new URLSearchParams(searchParams);
    params.set('page', parseInt(params.get('page'))-1 || 1);
    replace(`${pathName}?${params.toString()}`)

    setPageIndex(p => {
      let newPageIndex = [];

      if(pageIndex[1] - pageIndex[0] < 9){
        newPageIndex = [pageIndex[0]-9, pageIndex[1]-(pageIndex[1] - pageIndex[0])]
      }
      else if(searchResults.items[newPageIndex[0]] === undefined){
        newPageIndex = [0, 9]
      }
      else{
        newPageIndex = [pageIndex[0]-9, pageIndex[1]-9]
      }
      return newPageIndex;
    })
  }



  return (
    <div className="SearchResults h-full">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          </thead>
          {userState &&
          <tbody>

            {searchResults?.items.slice(pageIndex[0], pageIndex[1]).map(item => {
              const searchTypeMap = {
                'track': <Track />,
                'artist': <Artist />,
                'album': <Album />
                }
                return <itemContext.Provider value={item} key={uuidv4()}>{searchTypeMap[searchType]}</ itemContext.Provider>
              }
            )}
          </tbody>
          }
          
          <tfoot>
          </tfoot>
        </table>
    </div>
      <div className="flex grow w-full justify-between">
          <div className="prevBtn w-1/3 flex justify-start items-end">{pageIndex[0] > 0 && <button className="btn btn-outline mx-auto" onClick={prevPage}>Previous page</button>}</div>
          <div className="nxtBtn w-1/3 flex justify-end">{pageIndex[1] < searchResults?.items.length-1 && <button className="btn btn-outline mx-auto" onClick={nextPage}>Next</button>}</div>
        </div>
    </div>
  )
}
