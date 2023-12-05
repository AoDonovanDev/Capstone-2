import SearchResults from "@/app/ui/SearchResults";
import { getTrack } from "@/app/lib/actions";

export default async function Page( { params } ){
  const { id } = params;
  const track = await getTrack(id)
  return (
    <>
    <SearchResults searchResults={{track}}/>
    </>
  )
}