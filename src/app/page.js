
import Link from 'next/link';


export default function Page() {
  
  return (
    <div className='Home h-5/6'>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Soundrake</h1>
            <p className="py-6">Review your favorite music. <br /> Find similar artists and tracks.<br /> Find out what your friends think.</p>
            <div className="flex justify-between">
              <Link className="btn btn-primary" href="/login">Login</Link>
              <Link className="btn btn-primary" href="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  )
}
