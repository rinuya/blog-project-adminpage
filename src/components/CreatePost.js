import React, { useEffect, useState } from "react";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import TagList from "./TagList";
import { DateTime } from "luxon";



const  CreatePost = () => {
     
    const editorRef = useRef(null);

    const [postDetails, setPostDetails] = useState({
        title: "",
        preview: "",
        content: "",
        //how do I upload images
        img: "",
        tags: [], 
        date: "",
        comments: [],
        public: false,

    });

    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");

    const navigate = useNavigate();

    //helper functions
    const createPost = async (formPost) => {
        try{
            let post = await { ...formPost, date: DateTime.now().toISO(), content: editorRef.current.getContent(), tags: [...tags]};
            let token = await localStorage.getItem("token");
            let response = await fetch("http://localhost:3000/private/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(post)
            });
            response = await response.json();
            console.log(response);
  
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

    //form functions
    const handleChange = (event) => {
        setPostDetails({ ...postDetails, [event.target.name]: event.target.value });
    };

    const handleTagInput = (event) => {
        setCurrentTag(event.target.value)
    }

    const handleTagSubmit = async () => {
        if (currentTag.length>0){
            await setTags([
                ...tags, currentTag,
            ])
            await setCurrentTag("");
        }
        else {
            return
        }
    }

    async function handleSubmit (event) {
        event.preventDefault();
        // prevents the submit button from refreshing the page
        await createPost(postDetails);
        // navigate("/posts/:post");
      };
    
    return (
        <div className="h-full neutral-content w-full py-16 px-1 md:px-4 bg-base-200">
        <div className="flex flex-col items-center justify-center ">
            <div className="flex flex-col shadow rounded lg:w-2/3 w-full lg:p-10 p-3 md:p-5 bg-base-100">
                <p tabIndex={0} aria-label="Login to your account" className="prose-xl text-2xl font-extrabold leading-6">
                   Create a Blog-Post
                </p>
                <form onSubmit={handleSubmit} className="divide-dashed">
                <div className="form-control w-full">
                    <label className="label mt-5">
                        <span className=" prose-xl">Title</span>
                    </label>
                    <input type="text" placeholder="Title" name="title" className="input input-bordered input-secondary focus:border-secondary"  onChange={handleChange} value={postDetails.title} />
                </div>
                <div className="form-control w-full">
                    <label className="label md:mt-5 mt-2">
                        <span className=" prose-xl">Preview</span>
                    </label>
                    <textarea maxlength="300" type="text" placeholder="This is what will be displayed in the post preview on the /posts page" name="preview" className="focus:border-secondary textarea textarea-bordered textarea-secondary h-28"  onChange={handleChange} value={postDetails.preview} />
                </div>
                
                <div className="form-control w-full">
                <label className="label md:mt-5 mt-2">
                        <span className=" prose-xl">Content</span>
                    </label>
                <Editor
                
                    className=""
                    apiKey='kxfj8qy6ranaymhnhb3ztslyyt1btjj6zaythm4i2jj97jd3'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],  
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                </div>
                
                <div className="form-control w-full">
                    <label className="label mt-5">
                        <span className=" prose-xl">Tags</span>
                    </label>
                    <TagList tagList={tags} />
                    <div class="input-group">
                    <input type="text" placeholder="Tag" name="tags" className="focus:border-secondary input input-secondary input-bordered lg:w-1/2 xl:w-1/2 md:w-1/2 w-2/3"  onChange={handleTagInput} value={currentTag} />
                    <button type="button" className="btn btn-secondary" onClick={handleTagSubmit}>Add tag</button>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label mt-5">
                        <span className=" prose-xl">Upload Image (Coming soon...)</span>
                    </label>
                </div>
                <div className="mt-8">
                    <button type="submit" className="btn btn-primary px-12">
                        Create your Post!
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
    );
}
export default CreatePost;
