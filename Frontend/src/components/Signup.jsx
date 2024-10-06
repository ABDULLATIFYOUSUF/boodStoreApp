import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/index"
function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${BASE_URL}/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("signup successfully");
          setTimeout(()=>{
          },3000)
          localStorage.setItem("User", JSON.stringify(res.data.user));
          navigate("/")
          window.location.reload()
        }
      })
      .catch((err) => {
        if (err.response) {
        toast.error("Error: " +  err.response.data.message);
        }
      });
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[600px]">
        <div className="modal-box dark:bg-slate-500 dark:text-white">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg">Signup</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                {...register("fullname", { required: true })}
                type="text"
                placeholder="Enter Your Full Name...."
                className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-500 dark:text-white"
              />
              <br />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter Your Email...."
                className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-500 dark:text-white"
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter Your Password...."
                className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-500 dark:text-white"
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Signup
              </button>
              <div>
                <p>
                  Have account?{" "}
                  <button
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                    }}
                  >
                    Login
                  </button>
                  <Login />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
