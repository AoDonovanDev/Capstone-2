import SearchResults from "@/app/ui/SearchResults";
import { getTrack } from "@/app/lib/actions";
import StarRating from "@/app/ui/StarRating";
import Track from "@/app/ui/Track";

export default async function Page( { params } ){
  const { id } = params;
  const track = await getTrack(id)
  console.log('track in track page', track)
  return (
    <>
    <SearchResults searchResults={{track}}/>
    </>
  )
}