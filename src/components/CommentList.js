import React, { useEffect, useState } from "react";
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
      response = await response.json();
      setData(response);
      setDataReceived(true)
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
      response = await response.json();
      window.location.reload();
  }
    catch (error) {
        console.error(error);
    }
  }



  async function approveComment(id) {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch(`http://localhost:3000/private/comments/${id}/edit`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      });
      response = await response.json();
      console.log(response);
      window.location.reload();
  }
    catch (error) {
        console.error(error);
    }
  }


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
                    <button className="btn btn-secondary" onClick={()=>approveComment(comment._id)}>Approve</button>
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
  