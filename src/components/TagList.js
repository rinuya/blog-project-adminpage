function TagList(props) {

    let tagList = props.tagList;
    let handleTagDelete = props.handleTagDelete;
    
    return (
      <div>
         {tagList.map((tag) => {
            return <div className="badge badge-accent badge-outline mb-2 mr-2 p-3"><p className="text-xs">{tag}</p><label className="hover:cursor-pointer ml-2" onClick={()=>handleTagDelete(tag)}>X</label></div>
        })}
      </div>
    );
  }
  
  export default TagList;
  