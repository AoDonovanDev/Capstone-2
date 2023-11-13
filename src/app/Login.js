"use client"

import { useState } from "react"
import './login.css'

export default function Login({login, warnings}){

  const [formData, setForm] = useState({
    username: '',
    password: ''
  })


  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData,
      [name]: value
    }));
  };

  

  return (
     <form className="Login">
      <h3>Login</h3>
      <p>{warnings}</p>
      <label htmlFor="username">Username</label>
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

      <button type="button" className="btn btn-success" onClick={() => login(formData)}>Login</button>
    </form>
  )
}