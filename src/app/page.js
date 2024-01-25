import Image from 'next/image';
import Link from 'next/link';


export default function Page() {
  
  return (
    <div className='Home h-full'>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Soundrake</h1>
            <div className="flex flex-col items-center">
              <p>Powered by</p><Image src={"/sp_logo.png"} height={75} width={150} alt="spotify logo"/>
            </div>
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
