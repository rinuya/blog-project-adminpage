import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const  Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });


    const loginFunction = async (username, password) => {
        try{
            let response = await fetch("http://localhost:3000/public/adminlogin", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                })
            });
            response = await response.json();
            localStorage.setItem("token", response.token)
            console.log (response)
        }
        catch (error) {
            console.error(error);
        }
       
    }
    // 
    // function ....
    // let history = useHistory();
    // if success then 
    // { 
    // history.push(/"posts");
    // } 
    //
    // 


    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
      };

    async function handleSubmit (event) {
        event.preventDefault();
        console.log("This is the react state:" +loginInfo.username +" "+ loginInfo.password)
        // prevents the submit button from refreshing the page
        await loginFunction();
      };
    


    return (
        <div className="h-full neutral-content w-full py-16 px-4 bg-base-200">
            <div className="flex flex-col items-center justify-center ">
                
                <div className="flex flex-col items-center shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 bg-base-100">
                    <p tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6">
                        Login to your account
                    </p>
                    <form onSubmit={handleSubmit}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label mt-5">
                            <span className="label-text ">Username</span>
                        </label>
                        <input type="text" placeholder="Username" name="username" className="input input-bordered w-full max-w-xs"  onChange={handleChange} value={loginInfo.username} />
                      
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" name="password"  onChange={handleChange} value={loginInfo.password} />
                       
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="btn btn-primary px-12">
                            Login
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
