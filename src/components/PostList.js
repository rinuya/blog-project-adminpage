import { data } from "autoprefixer";
import { postcss } from "daisyui/src/lib/postcss-prefixer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListCard from "./PostListCard";
import PostListList from "./PostListList";

function PostList() {

  // declare state that is showing wether data has been fetched or not (for GUI purposes)
  const [dataReceived, setDataReceived] = useState(false);

  const [data, setData] = useState({});

  const [pageParameters, setPageParameters] = useState({
    page: 1,
    postPerPage: 10,
    filter: {
      onlyPublic: false,
      onlyPrivate: false,
    },
  });

  useEffect(() => {
    fetchPosts()
  }, [])

 // Fetch data, then on response store that data in it's seperate state.
  async function fetchPosts () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("http://localhost:3000/private/posts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(pageParameters)
      });
      console.log(response)
      response = await response.json();
      console.log(response);
      setData(response);
      setDataReceived(true)

      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
  }
    catch (error) {
        console.error(error);
    }
  }


  // Display blog articles in a list 
  // If clicked on an article, pass down the item into the component through props
  if (dataReceived) {
      return (
        <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
          <div>
            <p>Public posts: {data.public_post_count}</p>
            <p>Private posts: {data.private_post_count}</p>
            <p>Total posts: {data.public_post_count+data.private_post_count}</p>
          </div>
          <PostListList posts={data.posts} />
          <p>Test if data received</p>
      </div>
      )
  }
  else {
    return(
      <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
        <div className="mt-4">
        </div>
          <p>Test if data is not received</p>
      </div>
    );
  }
  
}
  
  export default PostList;
  