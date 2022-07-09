import { Textarea, Input } from "react-daisyui";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

function CommentForm(props) {
    const post = props.post;

    const link = "/posts/" + post.title; 

    const navigate = useNavigate();


    const [commentDetails, setCommentDetails] = useState({
        author: "",
        content: "",
        date: "",  
        postid: post._id,
    });

    const createComment = async (comment) => {
        if (commentDetails.author.length < 3 || commentDetails.author.length>12){
            return alert("Alias too short")
        }
        if (commentDetails.content.length < 3 || commentDetails.content.length>120){
            return alert("Comment too short")
        }
        
        let url = "http://localhost:3000/public/posts/"+comment.postid+"/comments/create-comment"
        try{
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment)
            });
            response = await response.json();
            window.location.reload();
            //so once everything is subitted call the function that will reload the posts on the page before. You do that by passing the function in as props and then calling it inside here on success
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        setCommentDetails({ ...commentDetails, [event.target.name]: event.target.value });
    };

    async function handleCommentSubmit (event) {
        event.preventDefault();
        await createComment(commentDetails);
        // navigate("/posts/:post");
      };

    return (
      <div className="bg-base-200 px-3 pt-1 pb-3 rounded-xl flex flex-col items-center mb-10 shadow-md">
        <h4 className="text-2xl font-semibold">Leave a comment:</h4>
        <div className="pb-5 w-full flex justify-center">
            <form onSubmit={handleCommentSubmit} className="w-full max-w-md" method="POST">
                <div class="flex flex-col pb-5 w-full">
                    <input type="text" placeholder="Alias" class="input w-full  bg-base-100" name="author" onChange={handleChange} value={commentDetails.author} /> 
                </div>
                <div class="flex flex-col">
                    <textarea class="textarea bg-base-100  h-32" placeholder="Comment" name="content" onChange={handleChange} value={commentDetails.content}></textarea>
                </div> 
                <div className="flex w-full  justify-end">
                    <button className="btn mt-2 btn-secondary">Submit</button>
                </div>
            </form> 
        </div>       
      </div>
    );
  }
  
  export default CommentForm;
  