"server-only";
import axios from "axios";
import { cookies } from 'next/headers';


export const GET = async (path: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URI! + path,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const POST = async (path: string, data?: object) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URI! + path,
    data ? data : {},
    {
      headers:{
        Authorization: `Token ${token}`,
      }
    }
  );
};
