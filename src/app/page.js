"use client"
import { useState } from "react"
import Navbar from "./Navbar"
import Login from "./Login"
import SignUp from "./Signup"
import SearchResults from "./SearchResults"
import SoundrakeAPI from "./SoundrakeAPI"



export default function Home() {

  const [user, setUser] = useState('')
  const [pageState, setPageState] = useState('splash')
  const [warnings, setWarnings] = useState('')
  const [searchResults, setSearchResults] = useState({})


  async function login(formData){
    const result = await fetch('http://127.0.0.1:3000/auth/signin', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const {user, token} = await result.json();
    console.log(user)
    if(user){
      setUser(user)
      setPageState('loggedIn')
      setWarnings('')
      console.log(user, token)
    } else {
      console.log('oops')
      setWarnings('incorrect username/password')
    }
  }

  async function register(formData){
    const result = await fetch('http://127.0.0.1:3000/auth/new', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const { currentUser, token } = await result.json()
    if(currentUser){
      console.log(currentUser)
      setUser(currentUser)
      setPageState('loggedIn')
    }
  }

  function setLogin(){
    setPageState('login');
  }

  function setSignUp(){
    setPageState('signup')
  }

  function logOut(){
    setUser('')
    setPageState('dash')
  }
  
  return (
    <div className='Home'>
      <SoundrakeAPI />
      <Navbar user={user} setLogin={setLogin} setSignUp={setSignUp} logOut={logOut} setSearchResults={setSearchResults} />
      {pageState === 'login' ? <Login login={login} warnings={warnings}/> : <></>}
      {pageState === 'signup' ? <SignUp register={register} /> : <></>}
      {pageState === 'loggedIn' ? <h1>hi {user}</h1> : <></>}
      <SearchResults searchResults={searchResults}/>
    </div>
  )
}
