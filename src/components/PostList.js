// import './App.css';
import { data } from "autoprefixer";
import { postcss } from "daisyui/src/lib/postcss-prefixer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListCard from "./PostListCard";

function PostList() {
  
  // declare state that is showing wether data has been fetched or not (for GUI purposes)
  // Fetch data, then on response store that data in it's seperate state.
  // Display blog articles in a list 
  // If clicked on an article, pass down the item into the component through props

  const [dataReceived, setDataReceived] = useState({
    received: false, 
  });

  async function grabToken () {
    const localToken = localStorage.getItem("token");
    // do API call
    // store object in state
    // set dataReceived to true (triggers rerender)
  }

    return (
      <div className="bg-base-300 h-full neutral-content w-full flex flex-column justify-center">
        {/* <p>{token.token}</p> */}
        <PostListCard />       
      </div>
    );
  }
  
  export default PostList;
  