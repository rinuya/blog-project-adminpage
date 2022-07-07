import PostListCard from "./PostListCard";

function PostListList(props) {

    let posts = props.posts;
    return(
        posts.map(post=>{
            return( 
                <div className="mt-4 w-full flex flex-col items-center">
                  <PostListCard data={post} />
                </div>)}
    )
    )
}
  export default PostListList;
  