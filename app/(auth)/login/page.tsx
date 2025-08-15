"use client";

import GoogleLoginButton from "../../../components/googleLoginButton";
import React, { useState } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfa yenilenmesini engelle

    const { email, password } = loginForm;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Giriş yapıldı:", data);
        alert("Giriş başarılı!");
        // router.push("/"); // Anasayfaya yönlendirme
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Bir hata oluştu");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-5 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Login Page</h2>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <GoogleLoginButton />
    </div>
  );
};

export default Login;
