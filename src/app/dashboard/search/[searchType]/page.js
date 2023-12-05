
import SearchResults from "@/app/ui/SearchResults";
import { search } from "@/app/lib/actions";




export default async function Page({ params, searchParams }){

  
  const query = searchParams?.query || '';

  const { searchType } = params;
  
  const searchResults = await search (searchType, query)


  return (
    <>
    <h1>search {searchType}</h1>
    <SearchResults searchResults={searchResults}/>
    </>
  )
}