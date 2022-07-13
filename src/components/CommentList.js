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
      setDataReceived(true);
      fetchComments();

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
      setDataReceived(true);
      fetchComments();
  }
    catch (error) {
        console.error(error);
    }
  }


  if (dataReceived) {
      return (
        <div className="bg-base-300 h-full neutral-content w-full flex flex-col items-center py-5">

          <div className="mb-5">
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Approved comments</div>
                <div className="stat-value">{data.public}</div>
              </div>
            
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block ">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Unapproved posts</div>
                <div className="stat-value">{data.private}</div>
              </div>
            
              <div className="stat">
                <div className="stat-figure text-secondary hidden md:block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                </div>
                <div className="stat-title text-sm md:text-lg">Total comments</div>
                <div class="stat-value">{data.public+data.private}</div>
              </div>
            </div>
          </div>

          {data.comments.map(comment => {
            return (
                <div className="w-full max-w-4xl rounded-md bg-base-100 p-2 shadow-md flex justify-between">
                  <div>
                    <p className="text-lg neutral-focus font-bold">For: {comment.postid.title}</p> 
                    <p className="text-base-content">by {comment.author}</p>
                    <p classname="text-primary-content m-1">{comment.content}</p>
                    <p className="text-sm">{DateTime.fromISO(comment.date).toLocaleString(DateTime.DATE_MED)}</p>
                    <p>{comment.approved}</p>
                  </div> 
                  <div className="flex flex-col md:flex-row md: md:gap-5 items-center">
                    <button className="btn btn-outline btn-error" onClick={()=>deleteComment(comment._id)}>Delete</button>
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
  