'use client';
import Navbar from "../ui/Navbar";
import { userContext } from "../userContext";
import { getUserInfo, getToken, getUserStarred } from "../lib/actions";
import { useEffect, useState } from "react";
import { useContext } from "react";
import usePlayer from "../hooks/usePlayer";
import { transferPlayback } from "../lib/actions";





export default function Layout({children}){

  const user = useContext(userContext);
  const [userState, setUserState] = useState(user);
  const [token, setToken] = useState('');
  const [player, setPlayer] = usePlayer();

  useEffect( () => {
    (async function(){
      let currentUser = await getUserInfo();
      const token = await getToken();
      if(!currentUser && !token) return;
      if(token){
        const { access_token, refresh_token } = token;
        currentUser = {...currentUser, access_token, refresh_token};
        setToken(access_token)
        setUserState({...currentUser});
      } else {
        setUserState({...currentUser})
      }
      })();
  }, [])

  useEffect( () => {
    if(!token) return;
    (async () => {
      console.log('token found, running player init')
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      try{
      globalThis.onSpotifyWebPlaybackSDKReady = () => {
        
        
      const player = new globalThis.Spotify.Player({
      name: 'Soundrake Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5});
      
      player.addListener('ready', async({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      await transferPlayback(token, device_id);
      console.log(player)
      setPlayer(player);
      });

      player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      })
      player.connect();
      
      }
      }catch(e){
        console.log('the player failed to load', e)
    }
  })()
}, [token, setPlayer])

  
  
  return (
    <div>
      <userContext.Provider value={{userState, setUserState, player, setPlayer, token}}>
          <Navbar />
          {children}
      </userContext.Provider>
    </div>
  )
}