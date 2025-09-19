"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomInput from "../../../components/common/input";
import { GetUserInfo, UpdateUserInfo } from "../../../services/authService";

const page = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const data = await GetUserInfo(user.uid);
          setUserInformation({
            name: data.user.name || "",
            email: data.user.email || "",
          });
          console.log(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        await UpdateUserInfo(user.uid, userInformation.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row gap-24 w-full">
      <div className="flex flex-col gap-4 w-[50%] items-center">
        <h1 className="text-3xl font-bold">User Information</h1>
        <form
          onSubmit={handleUpdateInfo}
          className="w-full flex flex-col gap-4"
        >
          <CustomInput
            placeholder="Name"
            value={userInformation.name}
            onChange={(e) =>
              setUserInformation({ ...userInformation, name: e.target.value })
            }
          />
          <CustomInput
            placeholder="E-mail"
            value={userInformation.email}
            readOnly
          />
          <button className="bg-violet-800 cursor-pointer text-white rounded-2xl py-2 px-4 hover:scale-104 duration-500">
            Update
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-4 w-[50%] items-center">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <form
          onSubmit={handleUpdateInfo}
          className="w-full flex flex-col gap-4"
        >
          <CustomInput
            placeholder="Name"
            value={userInformation.name}
            onChange={(e) =>
              setUserInformation({ ...userInformation, name: e.target.value })
            }
          />
          <CustomInput
            placeholder="E-mail"
            value={userInformation.email}
            readOnly
          />
          <button className="bg-violet-800 cursor-pointer text-white rounded-2xl py-2 px-4 hover:scale-104 duration-500">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
