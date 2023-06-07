"server-only";
import axios from "axios";

export const GET = async (path: string, token?: string) => {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URI! + path,
    token
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {}
  );
};

export const POST = async (path: string, data?: object, token?: string) => {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URI! + path,
    data ? data : {},
    {
      headers: token
        ? {
            Authorization: `Token ${token}`,
          }
        : {},
    }
  );
};
