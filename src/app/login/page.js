'use client';

import Login from "../ui/Login";

export default function Page(){
  return(

    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl mb-10">Soundrake Login</h1>
           <Login />
        </div>
      </div>
    </div>

  )
}