import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

import { useProfileMutation } from "../../redux/api/users";
import { setCredentails } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Profie = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
        const res  = await updateProfile({
            _id : userInfo._id,
            username,
            email,
            password,
        }).unwrap();

        dispatch(setCredentails({...res}));
        toast.success("Profile Updated Successfully!")
    } catch (error) {
      toast.error(
        error.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="-mt-20">
      <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  className="form-input p-4 rounded-sm w-full"
                  placeholder="enter name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="email"
                  className="form-input p-4 rounded-sm w-full"
                  placeholder="enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  className="form-input p-4 rounded-sm w-full"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-input p-4 rounded-sm w-full"
                  placeholder="enter confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
