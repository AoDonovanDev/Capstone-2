import SearchBar from "../ui/SearchBar";
import SearchResults from "../ui/SearchResults";
import Tabs from "../ui/Tabs";


export default function Layout( { children } ){
  return (
    <>
    <Tabs />
    <SearchBar />
    <SearchResults searchResults={{}}/>
    </>
  )
}