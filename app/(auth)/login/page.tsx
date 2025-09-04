"use client";

import Image from "next/image";
import React, { useState } from "react";
import Slider, { SliderItem } from "../../../components/common/slider";
import CustomInput from "../../../components/common/input";
import GoogleLoginButton from "../../../components/googleLoginButton";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";

const slides: SliderItem[] = [
  {
    title: "Drive Your Journey",
    text: "Discover a smarter way to rent cars. Enjoy seamless booking, flexible options, and comfort designed to match your lifestyle.",
  },
  {
    title: "Experience True Freedom",
    text: "Hit the road with confidence. Our modern fleet and affordable pricing give you the freedom to travel without limits.",
  },
  {
    title: "Simple. Fast. Reliable.",
    text: "From quick reservations to secure payments, every detail is built to make your car rental experience effortless.",
  },
];

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      await api.post("/session", {token: idToken});
      return { uid: credential.user.uid, email: credential.user.email };
    },
    onSuccess: () => {
      router.push("/");
      setLoading(false);
    },
    onError: (error: any) => {
      alert(error?.message || "Login failed");
      setLoading(false);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginForm;
    mutation.mutate({
      email,
      password,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full h-screen relative text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-800/70 to-violet-400/90 z-1" />
      <Image
        src="/assets/homePage/HeroCarPhoto.jpg"
        alt="login background image"
        fill
        className="object-cover"
      />
      <div className="relative z-2 w-full h-full py-20 px-60 flex flex-row justify-center gap-24">
        <div className="w-full flex flex-col justify-center gap-24">
          <div className="flex flex-row space-x-4 items-center">
            <Image src="/logo.png" alt="car logo" width={64} height={64} />
            <h2 className="text-[24px] font-bold">Rent Car</h2>
          </div>

          <Slider key="login slider" slides={slides} />
        </div>
        <div className="w-full bg-white text-black rounded-xl p-6 flex flex-col gap-4">
          <h1 className="italic">Welcome Back</h1>
          <h2 className="font-semibold text-xl">Log In To Your Account</h2>
          <form
            action="submit"
            onSubmit={handleLogin}
            className="flex flex-col gap-4 mt-2"
          >
            <CustomInput
              name="email"
              required
              type="email"
              placeholder="email"
              value={loginForm.email}
              onChange={handleInputChange}
            />
            <CustomInput
              name="password"
              required
              type="password"
              placeholder="password"
              value={loginForm.password}
              onChange={handleInputChange}
            />
            <Link
              href="/forgot-password"
              className="w-full flex justify-end cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>

            <button
              disabled={loading}
              type="submit"
              className={`cursor-pointer text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 text-lg ${
                loading ? "bg-violet-800/50 " : "bg-violet-800 "
              } `}
            >
              {loading ? "Log In..." : "Login"}
            </button>
          </form>
          <div className="w-full relative my-2">
            <hr className="text-gray-500" />
            <p className="absolute z-1 -top-3 right-1/2 bg-white px-1">Or</p>
          </div>
          <div>
            <GoogleLoginButton value="Log In With Google" />
          </div>
          <div className="flex flex-row w-full h-full justify-center items-center gap-2 ">
            <p>New User?</p>
            <Link
              href="/register"
              className="text-lg underline cursor-pointer font-semibold hover:text-amber-500"
            >
              SIGN UP HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
