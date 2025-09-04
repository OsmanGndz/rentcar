"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "../lib/axios";
import { useDispatch } from "react-redux";
import { setRole } from "../redux/features/authSlice";

const GoogleLoginButton = ({ value }: { value: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // 1. Google popup login
      const res = await signInWithPopup(auth, provider);

      // 2. User bilgilerini al
      const user = {
        name: res.user.displayName || "No Name",
        email: res.user.email || "No Email",
        uid: res.user.uid,
      };

      // 3. Firebase ID Token al
      const idToken = await res.user.getIdToken(); // 🔑 asıl token burası

      // 4. Backend’e kullanıcı bilgisini kaydet
      await api.post("/auth/user", user);

      // 5. Session cookie oluşturmak için token’ı backend’e gönder
      await api.post("/session", { token: idToken });

      // 6. Role bilgisini backend’den almak istersen ayrı bir endpoint çağırabilirsin
      // örn: const roleRes = await api.get("/auth/role");
      // dispatch(setRole(roleRes.data.role));

      // 7. Dashboard’a yönlendir
      router.push("/");
    } catch (err: any) {
      alert("Hata: " + err.message);
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="shadow-sm border border-gray-200 px-6 py-3 rounded flex flex-row w-full hover:scale-104 transition duration-500 cursor-pointer"
    >
      <Image
        src="/assets/google.png"
        alt="google image"
        width={18}
        height={18}
      />
      <p className="text-gray-700 text-center w-full">{value}</p>
    </button>
  );
};

export default GoogleLoginButton;
