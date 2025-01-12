import React, { useState, useEffect, useMemo } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { setCredentails } from "../../redux/features/auth/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useSearchParams();
  const sp = new URLSearchParams(search);

  const redirect = useMemo(() => sp.get("/redirect") || "/", [sp]);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentails({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(
        error.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-[2rem]">
        {/* Form Section */}
        <div className="flex flex-col justify-center w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-full">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`px-4 py-2 rounded my-4 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 text-white cursor-pointer"
              }`}
            >
              {isLoading ? "Signing in" : "Sign in"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                className="text-teal-500 hover:underline"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-2xl">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[75rem]] w-full object-cover rounded-lg "
          />
        </div>
      </section>
    </div>
  );
};
