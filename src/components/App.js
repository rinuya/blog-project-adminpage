// import './App.css';
import React, { useState } from "react";
import { useEffect } from 'react'
import PostList from "./PostList"
import Login from "./Login"
import CommentList from "./CommentList"
import CreatePost from './CreatePost'

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { themeChange } from 'theme-change'


// This will encompass the whole page, content will then have "Main JS"

function App() {
  
  //Changes theme 
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

    return (


      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2"><p className="prose lg:prose-xl">Blog Project - Admin</p></div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* <!-- Navbar menu content here --> */}
                <li><NavLink to="/posts">Posts</NavLink></li>
                <li><NavLink to="/comments">Comments</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><button data-toggle-theme="business,light" data-act-class="ACTIVECLASS">Toggle Theme</button></li>
              </ul>
            </div>
          </div>
          {/* <!-- Page content here, ROUTESWITCH --> */}
          <Routes>
            <Route exact path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/comments" element={<CommentList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}
              <li><NavLink  to="/posts">Posts</NavLink></li>
              <li><NavLink  to="/comments">Comments</NavLink></li>
              <li><NavLink  to="/login">Login</NavLink></li>
              <li><button data-toggle-theme="business,light" data-act-class="ACTIVECLASS">Toggle Theme</button></li>      
          </ul>
  </div>


  </div>
    );
  }
  
  export default App;
  