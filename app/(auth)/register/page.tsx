"use client";

import React, { useState } from "react";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const { email, password } = registerForm;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Kayıt yapıldı:", data);
        alert("Kayıt başarılı!");
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
      <h2 className="text-xl font-bold mb-4">register Page</h2>
      <form className="flex flex-col gap-3" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          register
        </button>
      </form>
    </div>
  );
};

export default Register;
