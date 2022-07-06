// import './App.css';
import { data } from "autoprefixer";
import { postcss } from "daisyui/src/lib/postcss-prefixer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListCard from "./PostListCard";

function PostList() {

  // declare state that is showing wether data has been fetched or not (for GUI purposes)
  const [dataReceived, setDataReceived] = useState(false);

  const [data, setData] = useState([]);

  const [pageParameters, setPageParameters] = useState({
    page: 1,
    postPerPage: 10, 
  });

 // Fetch data, then on response store that data in it's seperate state.
  async function grabToken () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("http://localhost:3000/private/posts", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(pageParameters)
      });
      response = await response.json();
      console.log(response);

      if (response.success) {
          setData(response);
          setDataReceived(true)
      } else {
          alert("Something went wrong!")
      }
      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
  }
  catch (error) {
      console.error(error);
  }
    // do API call
    // store object in state
    // set dataReceived to true (triggers rerender)
  }
  // Display blog articles in a list 
  // If clicked on an article, pass down the item into the component through props

  
  if (dataReceived) {
    return (
      <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
        <div className="mt-4">
          <PostListCard />
        </div>
        <p>Test if data received</p>
    </div>
    )
  }
  else {
    return(
      <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
        <div className="mt-4">
          <PostListCard />
        </div>
          <p>Test if data is not received</p>
      </div>
    );
  }
  
}
  
  export default PostList;
  