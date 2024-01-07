import SignUp from "../ui/Signup";

export default function Page() {
  return (

    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
           <h1 className="text-3xl mb-10">Sign Up for Soundrake</h1>
          <SignUp />
        </div>
      </div>
    </div>
  )
}