"use client"

import { useState } from "react"
import './login.css'
import { login } from "../lib/actions"
import { useRouter } from "next/navigation"

export default function Login(){

  const { replace } = useRouter();

  const [formData, setForm] = useState({
    username: '',
    password: ''
  })

  const [warnings, setWarnings] = useState('')


  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData,
      [name]: value
    }));
  };

  async function submitLoginForm(formData){
    const user = await login(formData);
    if(user){
      replace('/dashboard');
    } else {
      setWarnings('Login info does not match our records.')
    }
    
  }


  return (
     <form className="Login">
      <p>{warnings}</p>
      <label htmlFor="username" >Username</label>
      <input
        id="username"
        name="username"
        type="text"
        className="input input-bordered w-full max-w-xs"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        className="input input-bordered w-full max-w-xs"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="button" className="btn btn-success self-end" onClick={() => submitLoginForm(formData)}>Login</button>
    </form>
  )
}