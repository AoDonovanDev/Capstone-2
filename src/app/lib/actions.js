'use server'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function getArtist(id){
    const response = await fetch(`${process.env.BASE_URL}/artist/${id}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    return searchResults;
}

export async function getAlbum(id){
    const response = await fetch(`${process.env.BASE_URL}/album/${id}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    return searchResults;
}

export async function getTrack(id){
  const response = await fetch(`${process.env.BASE_URL}/track/${id}`, {
    cache: 'no-cache'
  })
  const { searchResults } = await response.json();
  return searchResults;
}

export async function search(searchType, query){
  if(!searchType || !query) return {};
  try{
    const response = await fetch(`${process.env.BASE_URL}/search/${searchType}/${query}`, {
      cache: 'no-cache'
    });
    const { searchResults } = await response.json();
    return searchResults;
  } catch(err){
    console.log('err', err)
  };
};

export async function login(formData){
  const result = await fetch(`${process.env.BASE_URL}/auth/signin`, {
    cache: 'no-cache',
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  })
  const {user, token, likes, ratings} = await result.json();
  if(user){
    cookies().set({
      name: "SoundrakeSession",
      value: token
    });
    return {user, token, likes};
  } else {
    console.log('client side server login error');
    return null;
  };
};

export async function register(formData){
  const result = await fetch(`${process.env.BASE_URL}/auth/new`, {
    cache: 'no-cache',
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  })
  const { currentUser, token } = await result.json();
  if(currentUser){
    cookies().set({
      name: "SoundrakeSession",
      value: token
    });
    return currentUser;
  };
};

export async function getUserInfo(){
  const user = cookies().get('SoundrakeSession');
  if(!user) return;

  const { value } = user;

  const response = await fetch(`${process.env.BASE_URL}/likes/getUserLikes`, {
    cache: 'no-cache',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({token: value})
    })

  const { likesMap, ratingsMap } = await response.json();
  if(user){
    return {user, likesMap, ratingsMap};
  }
};

export async function logout(){
  cookies().delete('SoundrakeSession');
  redirect('/');
};

export async function addLike(token, sp_id){
  const like = await fetch(`${process.env.BASE_URL}/likes/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({token, sp_id})
  });
};

export async function removeLike(token, sp_id){
  const like = await fetch(`${process.env.BASE_URL}/likes/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, sp_id})
  });
};

export async function spotifyAuthReq(){
  const response = await fetch(`${process.env.BASE_URL}/auth/spotify`, {
    cache: 'no-cache'
  });
  const { oauth_url } = await response.json();
  redirect(oauth_url)
}

export async function getToken(){
  const cookie = cookies().get('code');
  if(!cookie) return;
  const { value } = cookie;
  const response = await fetch(`${process.env.BASE_URL}/auth/token`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: value })
  })
  const { token } = await response.json();
  const { access_token, refresh_token } = token;
  cookies().delete('code');
  return {access_token, refresh_token};

}

export async function getPlaybackState(access_token){
  const response = await fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  const state = await response.json();
  return {isPlaying: state.isPlaying}
}

export async function playTrack(access_token, sp_id, position_ms){
  const req = {
    uris: [`spotify:track:${sp_id}`],
    position_ms: position_ms ?? 0
  }
  const response = await fetch('https://api.spotify.com/v1/me/player/play', {
    cache: 'no-cache',
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
}

export async function transferPlayback(access_token, device_id){
  const device_data = {
    device_ids: [device_id]
  }
  const response = await fetch('https://api.spotify.com/v1/me/player', {
    cache: 'no-cache',
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(device_data)
  })
}

export async function getUserStarred(token){
  //this is not currently used anywhere in the app
  const plResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
    cache: 'no-cache',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  const userPlaylists = await plResponse.json();
  const starred = userPlaylists.items.find((p) => p.name === 'Starred');
  const plHref = starred.tracks.href;
  const trResponse = await fetch(plHref, {
    cache: 'no-cache',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  const tracks = await trResponse.json();
  const starredIds = tracks.items.map(t => t.track.external_ids.isrc);
  let likesMap = {};
  for(let id of starredIds){
    likesMap[id] = id;
  }
  return likesMap;
}

export async function submitRating(prevState, formData){
  const token = prevState.token
  const response = await fetch(`${process.env.BASE_URL}/ratings/add`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      starRating: formData.get('starRating'),
      comments: formData.get('comments'),
      sp_id: formData.get('sp_id'),
      img_url: formData.get('img_url'),
      name: formData.get('name')
     })
  })
  const { rating } = await response.json();
  return { 
    ...prevState,
    message: 'rating created',
    rating
 };
}

export async function updateRating(prevState, formData){
  const token = prevState.token;
  const response = await fetch(`${process.env.BASE_URL}/ratings/update`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      starRating: formData.get('starRating'),
      comments: formData.get('comments'),
      sp_id: formData.get('sp_id')
    })
  });
  const { rating } = await response.json();
  if(prevState.detail){
    revalidatePath("/dashboard")
    redirect("/dashboard")
  }
  return { 
    ...prevState,
    message: 'rating updated',
    rating
 };
}

export async function getAverage(sp_id){
  const response = await fetch(`${process.env.BASE_URL}/ratings/average/${sp_id}`, {
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { average } = await response.json();
  return average;
}


