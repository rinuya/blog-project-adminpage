// import './App.css';
import { Link } from "react-router-dom";
import Avatar from "../images/91641202.jpeg"

function PostListCard() {

    const examplepost = {
        title: "Example Post Title that is a little longer than you would think",
        preview: "This is supposed to be a text preview of no longer than 300 chars. I will show you how I created this post with the help of nodeJs and other tools! Wohoo!!",
        content: "blblbl",
        tags: ["Node", "React", "Express"],
        date: Date.now,
        author: "Rinuya",
        comments: [{crazy: "crazy"}, {woah: "woah"}],
        public: false,
        _id: "21312312312413323213123"
    }


    return (
      <div className="max-w-4xl md:mx-6 mx-2">
        <div class="bg-base-100 p-6 rounded-lg drop-shadow-md">
            <span class="text-sm font-light">Mar 10, 2019</span>
    
            <div class="mt-2">
                <Link to="/posts"><a class="text-2xl font-bold hover:underline prose-2xl">{examplepost.title}</a></Link>
                <p class="mt-2">{examplepost.preview}</p>
            </div>
            
            <div class="flex items-center justify-between mt-4 ">
                <div className="flex items-center btn btn-secondary">
                <a>Read more</a>
                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            
                </div>
                

                <div class="flex items-center">
                    <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={Avatar} alt="avatar" />
                    <a class="font-bold text-secondary">{examplepost.author}</a>
                </div>
            </div>
                
            {/* <a href={examplepost._id}>
                <h5 class="mb-2 text-2xl font-bold tracking-tight prose-2xl">{examplepost.title}</h5>
            </a>    
        
            
            <div>
                {examplepost.tags.map(tag=>{
                    return <p className="text-gray-800 text-xs badge badge-accent p-1 mr-3 mb-4">{tag}</p>
                })}
            </div>
            <p class="mb-3 font-normal py-3">{examplepost.preview}</p>
            <div className="w-full flex justify-between">
            <a href={examplepost._id} class="btn btn-secondary mt-2">
                Read more
                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <p className="justify-sef-end mt-auto text-sm">by Rinuya</p>
            </div> */}
        </div>
      </div>
    );
  }
  
  export default PostListCard;
  