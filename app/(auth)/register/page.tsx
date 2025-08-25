"use client";

import React, { useState } from "react";
import CustomInput from "../../../components/common/input";
import Image from "next/image";
import Slider, { SliderItem } from "../../../components/common/slider";
import GoogleLoginButton from "../../../components/googleLoginButton";
import Link from "next/link";
import { RegisterUser } from "../../../services/authService";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { setRole } from "../../../redux/features/authSlice";

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

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => RegisterUser(name, email, password),
    onSuccess: (data) => {
      console.log("Register succesfull");
      router.push("/");
      setLoading(false);
    },
    onError: (error: any) => {
      alert(error);
      setLoading(false);
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = registerForm;
    mutation.mutate({
      name,
      email,
      password,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
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
          <h1 className="italic">Let's Get You Started</h1>
          <h2 className="font-semibold text-xl">Create An Account</h2>
          <form
            action="submit"
            onSubmit={handleRegister}
            className="flex flex-col gap-4 mt-2"
          >
            <CustomInput
              required
              name="name"
              type="text"
              placeholder="name"
              value={registerForm.name}
              onChange={handleInputChange}
            />
            <CustomInput
              required
              name="email"
              type="email"
              placeholder="email"
              value={registerForm.email}
              onChange={handleInputChange}
            />
            <CustomInput
              required
              name="password"
              type="password"
              placeholder="password"
              value={registerForm.password}
              onChange={handleInputChange}
            />

            <button
              disabled={loading}
              type="submit"
              className={`cursor-pointer text-white px-4 py-2 rounded-lg hover:scale-104 transition duration-500 text-lg ${
                loading ? "bg-violet-800/50 " : "bg-violet-800 "
              } `}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="w-full relative my-2">
            <hr className="text-gray-500" />
            <p className="absolute z-1 -top-3 right-1/2 bg-white px-1">Or</p>
          </div>
          <div>
            <GoogleLoginButton value="Sign Up With Google" />
          </div>
          <div className="flex flex-row w-full h-full justify-center items-center gap-2 ">
            <p>Already have an account?</p>
            <Link
              href="/login"
              className="text-lg underline cursor-pointer font-semibold hover:text-amber-500"
            >
              LOGIN HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
