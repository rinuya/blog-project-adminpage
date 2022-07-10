import { data } from "autoprefixer";
import { postcss } from "daisyui/src/lib/postcss-prefixer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function PostList() {

  // declare state that is showing wether data has been fetched or not (for GUI purposes)
  const [dataReceived, setDataReceived] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    fetchComments()
  }, [])

 // Fetch data, then on response store that data in it's seperate state.
  async function fetchComments () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("http://localhost:3000/private/comments", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      });
      console.log(response);
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

  async function deleteComment(id) {
    try{
      
      let token = await localStorage.getItem("token");
      let response = await fetch(`http://localhost:3000/private/comments/${id}/delete`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      });
      console.log(response);
      response = await response.json();
      console.log(response);
      setData(response);
      setDataReceived(true)
      window.location.reload();

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
          <div className="bg-base-100 max-w-2xl w-full shadow rounded-xl p-2">
            <p>Public posts: {data.public}</p>
            <p>Private posts: {data.private}</p>
            <p>Total posts: {data.public+data.private}</p>
          </div>
          {data.comments.map(comment => {
            return (
                <div className="w-full border border-secondary flex justify-between">
                  <div>
                    <p>by {comment.author}</p>
                    <p>{comment.content}</p>
                    <p>{DateTime.fromISO(comment.date).toLocaleString(DateTime.DATE_MED)}</p>
                    <p>{comment.approved}</p>
                    <p>{comment.postid}</p> 
                  </div> 
                  <div className="flex flex-col md:flex-row md: md:gap-5 items-center">
                    <button className="btn btn-outline" onClick={()=>deleteComment(comment._id)}>Delete</button>
                    <button className="btn btn-secondary">Approve</button>
                  </div>
                </div>
            )
          })}
      </div>
      )
  }
  else {
    return(
      <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center">
        <div className="mt-4">
        </div>
          <p>Waiting for comments to load</p>
      </div>
    );
  }
  
}
  
  export default PostList;
  