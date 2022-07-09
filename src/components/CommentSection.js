function CommentSection(props) {

    let comments = props.comments;

    return (
      <div>
        <h3 className="block mt-2 text-2xl font-semibold">Discussion:</h3>
         {comments.map((comment) => {
            return <p className="mb-2 mr-2 p-3 text-xs">{comment}</p>
        })}
      </div>
    );
  }
  
  export default CommentSection;
  