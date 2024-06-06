import axios, { AxiosError } from "axios";

export const GET = async (path: string, token?: string) => {
  try {
    return await axios.get(process.env.NEXT_PUBLIC_API_URI! + path, {
      headers: token
        ? {
            Authorization: `Token ${token}`,
          }
        : {},
    });
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

export const POST = async (path: string, data?: object, token?: string) => {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URI! + path,
    data ? data : {},
    token
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {},
  );
};

export const PUT = async (path: string, token?: string) => {
  return await axios.put(
    process.env.NEXT_PUBLIC_API_URI! + path,
    {},
    token
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {},
  );
};

export const DELETE = async (path: string, token?: string) => {
  return await axios.delete(process.env.NEXT_PUBLIC_API_URI! + path, {
    headers: token
      ? {
          Authorization: `Token ${token}`,
        }
      : {},
  });
};
