import Axios from "axios";

const getCookie = async (key: string) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const token = (await cookies()).get(key)?.value;
    return token || "";
  } else {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${key}=`))
        ?.split("=")[1] || ""
    );
  }
};

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    
  },
});
// Interceptor simplificado que funciona de manera diferente en cliente y servidor
axios.interceptors.request.use(async (config) => {
  const token = await getCookie("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
