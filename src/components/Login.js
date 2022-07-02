import React, { useState } from "react";

const  Login = () => {
    return (
        <div className="h-full neutral-content w-full py-16 px-4 bg-gradient-to-r from-indigo-100 to-transparent">
            <div className="flex flex-col items-center justify-center ">
                
                <div className="flex flex-col items-center shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 bg-base-100">
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6">
                        Login to your account
                    </p>
               
                    <div class="form-control w-full max-w-xs">
                        <label className="label mt-5">
                            <span className="label-text ">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        <label className="label">
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        <label class="label">
                        </label>
                    </div>
                    <div className="mt-8">
                        <button className="btn btn-primary px-12">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
