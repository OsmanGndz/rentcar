// lib/axios.ts
import axios, { type AxiosRequestHeaders } from "axios";
import { auth } from "../services/firebase";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    if (!config.headers) config.headers = {} as AxiosRequestHeaders;
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;