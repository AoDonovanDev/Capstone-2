"use client"
import { useState } from "react"
import './signup.css'

export default function SignUp({register}){

  const [formData, setForm] = useState({
    username: '',
    password: '',
    passwordB: '',
  })


  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData,
      [name]: value
    }));
  };

  

  return (
     <form className="SignUp">
      <h3>Sign Up</h3>
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

      <label htmlFor="passwordB">Confirm Password</label>
      <input
        id="passwordB"
        name="passwordB"
        type="passwordB"
        className="input input-bordered w-full max-w-xs"
        value={formData.passwordB}
        onChange={handleChange}
      />

      <button type="button" className="btn btn-success" onClick={() => register(formData)}>SignUp</button>
    </form>
  )
}