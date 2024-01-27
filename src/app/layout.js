import { Inter } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SoundRake',
  description: 'SoundRake',
}


export default async function RootLayout({ children }) {
  async function checkSession(){
    return cookies().get('SoundrakeSession');
   };
  const token = await checkSession();
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
   
    </html>
  )
}
