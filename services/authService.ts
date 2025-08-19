
import { checkUserExist } from "../app/api/auth/user/route";
import api from "../lib/axios";

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

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Login failed." )
    }

}

export async function CreateUser({name, email, uid}: {
    name: string; 
    email: string; 
    uid: string
}) {
    try {
        const isExist = await checkUserExist(uid);

        if(isExist) return;
        
        const res = await api.post("auth/user", {
            name, email, uid
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "User creation failed.");
    }

}