import { DateTime } from "luxon";

function CommentSection(props) {

    let comments = props.comments;

    return (
      <div>
        <h3 className="block mt-2 text-2xl font-semibold">Discussion:</h3>
         {comments.map((comment) => {
            return (
                <div className="flex flex-col mb-2 mr-2 p-3 border rounded-md">
                    <div className="flex">
                        <p className="text-xs">{comment.author}</p>
                        <p>{DateTime.fromISO(comment.date).toLocaleString(DateTime.DATE_MED)}</p>
                    </div>
                    <p>{comment.content}</p>
                </div>
                
            )
        })}
      </div>
    );
  }
  
  export default CommentSection;
  