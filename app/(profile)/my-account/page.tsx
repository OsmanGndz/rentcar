"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomInput from "../../../components/common/input";
import {
  changePassword,
  GetUserInfo,
  UpdateUserInfo,
} from "../../../services/authService";
import { auth } from "../../../services/firebase";

const page = () => {
  const { user } = useSelector((state: any) => state.auth);
  const googleLogin =
    auth.currentUser?.providerData[0].providerId === "google.com";
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
  });

  const [changePasswordData, setChangePasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(
        changePasswordData.password,
        changePasswordData.newPassword,
        changePasswordData.confirmPassword
      );
    } catch (error) {
      console.log(error);
    } finally {
      setChangePasswordData({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-24 w-full justify-center items-center">
      <div className="flex flex-col gap-4 w-full md:w-[50%] items-center">
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
      {!googleLogin && (
        <div className="flex flex-col gap-4 w-full md:w-[50%] items-center">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <form
            onSubmit={handleChangePassword}
            className="w-full flex flex-col gap-4"
          >
            <CustomInput
              type="password"
              placeholder="Password"
              value={changePasswordData.password}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  password: e.target.value,
                })
              }
            />
            <CustomInput
              type="password"
              placeholder="New Password"
              value={changePasswordData.newPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  newPassword: e.target.value,
                })
              }
            />
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              value={changePasswordData.confirmPassword}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button className="bg-violet-800 cursor-pointer text-white rounded-2xl py-2 px-4 hover:scale-104 duration-500">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
