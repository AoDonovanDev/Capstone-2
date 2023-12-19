
import SearchResults from "@/app/ui/SearchResults";
import { search } from "@/app/lib/actions";




export default async function Page({ params, searchParams }){

  
  const query = searchParams?.query || '';

  const { searchType } = params;
  
  const { track, tracks, artists, albums} = await search (searchType, query);
  const searchResults = track || tracks || artists || albums;


  return (
    <>
    <h1>search {searchType}</h1>
    <SearchResults searchResults={searchResults} searchType={searchType}/>
    </>
  )
}