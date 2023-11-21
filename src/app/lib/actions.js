'use server'

export async function getArtist(id){
    const response = await fetch(`http://127.0.0.1:3000/artist/${id}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    return searchResults;
}

export async function getAlbum(id){
    const response = await fetch(`http://127.0.0.1:3000/album/${id}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    console.log('serve action', searchResults)
    return searchResults;
}
