import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { Parser } from 'html-to-react'
import './blogpost.css';
import { DateTime } from "luxon";
import Avatar from "../images/91641202.jpeg";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";

function Post(props) {
  
  const [post, setPost] = useState({});

  const [postReceived, setPostReceived] = useState(false);

  const formattedDate = DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED);

  useEffect(() => {
    fetchPost()
  }, [])

  const params = useParams();

  const navigate = useNavigate();


  async function fetchPost () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("https://shrouded-wave-21751.herokuapp.com/private/posts/post", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(params)
      });
      response = await response.json();
      setPost(response.post[0]);
      setPostReceived(true);
      console.log(post.img)

      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
    }
    catch (error) {
        console.error(error);
    }
  }

  async function publicizePost () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("https://shrouded-wave-21751.herokuapp.com/private/posts/post/publicize", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(params)
      });
      response = await response.json();
      setPostReceived(false);
      fetchPost();
      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
    }
    catch (error) {
        console.error(error);
    }
  }

  async function privatizePost () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("https://shrouded-wave-21751.herokuapp.com/private/posts/post/privatize", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(params)
      });
      response = await response.json();
      setPostReceived(false);
      fetchPost();
      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
    }
    catch (error) {
        console.error(error);
    }
  }

  async function deletePost () {
    try{
      let token = await localStorage.getItem("token");
      let response = await fetch("https://shrouded-wave-21751.herokuapp.com/private/posts/post/delete", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(params)
      });
      response = await response.json();
      if (response.success) {
        navigate("/posts");
    } else {
        alert(response.message)
    }
      //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
    }
    catch (error) {
        console.error(error);
    }
  }

  async function editPost () {
    const link = "/posts/"+post.title+"/edit-post"; 
    navigate(link);
  }

  if (postReceived) {
    return (
      <div className="bg-base-200 h-full neutral-content w-full flex flex-col items-center py-5">
        {/* Modal */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="font-bold text-lg">Are you sure you want to delete this post?</h3>
              <p className="py-4">You might want to consider unpublicizing your post before you attempt to delete it.</p>
              <div className="modal-action">
                <button className="btn btn-error" onClick={()=>deletePost()}>Delete</button>
                <label htmlFor="my-modal-4" className="btn btn-outline">Cancel</label>
              </div>
            </label>
          </label>
       

        <div className="max-w-3xl w-full overflow-hidden bg-base-100 rounded-lg shadow-md">
          {post.img ? <img className="object-cover w-full h-64" src={post.img} alt="Article" /> : <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Article" />}
          <div className="px-3 pt-3 md:px-6 md: pt-6">
            <div>
              {post.tags.map(tag=>{
                    return <p className="text-xs badge badge-outline badge-accent p-2 mr-2 mb-2 mt-3">{tag}</p>
              })}
              <h2 className="block mt-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm ">{post.preview}</p>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                <img className="hidden object-cover w-10 h-10 mr-2 rounded-full sm:block" src={Avatar} alt="avatar" />
                <a className="font-bold ">{post.author}</a>
            </div>
            <span className="mx-4 text-sm ">{formattedDate}</span>
          </div>
          <div className="divider" />
        </div>
        
        <div className="blogpost px-3 md:px-6">  
          {Parser().parse(post.content)}
          <div className="divider" />
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={()=>editPost()}>Edit</button>
            { post.public ?  <button className="btn btn-outline" onClick={()=>privatizePost()}>Make post Private</button> : <button className="btn btn-outline" onClick={()=>publicizePost()}>Make post Public</button> }
            <label htmlFor="my-modal-4" className="btn modal-button btn-warning btn-outline">Delete Post</label>
          </div>
        <div className="divider" />
        <CommentSection post={post} comments={post.comments} />
        <CommentForm post={post} />
        </div>
      
      </div>
    </div>
  );  
  }
  else {
    <div className="bg-base-300">
      Waiting for fetch
    </div>
  }
  
 
}
  
export default Post;
  