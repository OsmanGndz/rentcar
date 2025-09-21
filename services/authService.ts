
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
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

export async function GetUserInfo(uid: string) {
    try {
        const res = await api.get(`/auth/user/${uid}`)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function UpdateUserInfo(uid: string, name: string) {
    try {
        const res = await api.put(`/auth/user/${uid}`,{
            name
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Kullanıcı giriş yapmamış.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Yeni şifre ve doğrulama şifresi aynı değil!");
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return { success: true, message: "Şifre başarıyla güncellendi!" };
  } catch (error: any) {
    console.error("Şifre değiştirme hatası:", error);

    if (error.code === "auth/wrong-password") {
      throw new Error("Eski şifre yanlış!");
    }

    if (error.code === "auth/weak-password") {
      throw new Error("Yeni şifre çok zayıf. Daha güçlü bir şifre girin.");
    }

    throw new Error("Şifre değiştirme başarısız. Lütfen tekrar deneyin.");
  }
}
