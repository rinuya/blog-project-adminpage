// import './App.css';

function TagList(props) {
    let tagList = props.tagList;

    return (
      <div>
         {tagList.map((tag) => {
            return <p className="text-gray-800 badge badge-accent mb-2 mr-2 p-3">{tag}</p>
        })}
      </div>
    );
  }
  
  export default TagList;
  