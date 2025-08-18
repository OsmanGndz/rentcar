"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GoogleLoginButton = ({ value }: { value: string }) => {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      router.push("/");
    } catch (err: any) {
      alert("Hata: " + err.message);
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
