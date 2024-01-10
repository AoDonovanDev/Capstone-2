import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request){
  const cookieStore = cookies();
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code');
  cookies().set({
    name: 'code',
    value: code
  })
  console.log('auth call back', code)
  redirect('/dashboard/search/track');
}