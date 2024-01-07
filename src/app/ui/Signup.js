"use client"
import { useState } from "react"
import './signup.css'
import { register } from "../lib/actions"
import { useRouter } from "next/navigation"

export default function SignUp(){

  const { replace } = useRouter();

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

  async function submitRegisterForm (formData) {
    const user = await register(formData);
    if(user){
      replace('/dashboard')
    }
  }
  

  return (
     <form className="SignUp">
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

      <button type="button" className="btn btn-success self-end" onClick={() => submitRegisterForm(formData)}>SignUp</button>
    </form>
  )
}