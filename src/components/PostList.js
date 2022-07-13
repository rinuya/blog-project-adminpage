import React, { useEffect, useState } from "react";
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
      response = await response.json();
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
        <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center pt-5">
          <div>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Public posts</div>
                <div className="stat-value">{data.public_post_count}</div>
              </div>
            
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block ">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Private posts</div>
                <div className="stat-value">{data.private_post_count}</div>
              </div>
            
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Total posts</div>
                <div class="stat-value">{data.public_post_count+data.private_post_count}</div>
              </div>
            </div>
          </div>
          <PostListList posts={data.posts} />
      </div>
      )
  }
  else {
    return(
      <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
        <div className="mt-4">
        </div>
          <p>Loading posts...</p>
      </div>
    );
  }
  
}
  
  export default PostList;
  