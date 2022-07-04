import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const  CreatePost = () => {
    
    const [postDetails, setPostDetails] = useState({
        title: "",
        content: "",
        //how do I upload images
        img: "",
        tags: [], 
        date: "",
        comments: [],
        public: false,

    });

    const navigate = useNavigate();

    const createPost = async (formPost) => {
        let post = { ...formPost, date: Date.now() }


    }

    const handleChange = (event) => {
        setPostDetails({ ...postDetails, [event.target.name]: event.target.value });
      };

    async function handleSubmit (event) {
        event.preventDefault();
        // prevents the submit button from refreshing the page
        await createPost(postDetails);
      };
    


    return (
       <div>
        Create
       </div>
    );
}
export default CreatePost;
