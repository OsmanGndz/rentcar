"use client"
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Giriş yaptı:", user.email);
      alert("Giriş başarılı: " + user.displayName);
    } catch (err: any) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Google ile Giriş Yap
    </button>
  );
};

export default GoogleLoginButton;
