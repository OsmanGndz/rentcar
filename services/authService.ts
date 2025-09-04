
import api from "../lib/axios";
import { auth } from "./firebase";

export async function RegisterUser(name:string, email: string, password:string) {
    
    try {
        const res = await api.post("/auth/register",{
            name, email, password
        })

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Register failed." )
    }

}

export async function LoginUser(email: string, password:string) {
    
    try {
        const res = await api.post("/auth/login",{
            email, password
        })

        await api.post("/session",{
            token: res.data.token
        })

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Login failed." )
    }

}