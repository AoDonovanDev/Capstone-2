'use client';
import Navbar from "../ui/Navbar";
import { userContext } from "../userContext";
import { getUserLikes, getToken } from "../lib/actions";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Player from "../ui/Player";
import usePlayer from "../hooks/usePlayer";
import { transferPlayback } from "../lib/actions";




export default function Layout({children}){

  const user = useContext(userContext)
  const [userState, setUserState] = useState(user);
  const [token, setToken] = useState('')
  const [player, setPlayer] = usePlayer()

  useEffect( () => {
    (async function(){
      console.log('user set useEffect')
      let currentUser = await getUserLikes();
      const token = await getToken();

      if(!currentUser && !token) return;

      if(!currentUser){
        const { access_token, refresh_token } = token;
        currentUser = {access_token, refresh_token}
        var likesMap = [];
        setToken(access_token)
      } else {
        var { likesMap } = currentUser;
      }
      setUserState({...currentUser, likesMap});
      })();
  }, [])

  useEffect( () => {
    if(!token) return;

    (async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      globalThis.onSpotifyWebPlaybackSDKReady = () => {
        
        
      const player = new globalThis.Spotify.Player({
      name: 'Soundrake Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5});
      
      player.addListener('ready', async({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      await transferPlayback(token, device_id)
      });

      player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      })
      console.log('token before connect', token)
      setPlayer(player);
      console.log(player)
      player.connect();
  };
  })()
}, [token, setPlayer])

  
  
  return (
    <div>
      <userContext.Provider value={{userState, setUserState, player}}>
        <Navbar />
        {children}
      </userContext.Provider>
    </div>
  )
}