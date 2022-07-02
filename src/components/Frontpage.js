// import './App.css';
import { Link } from "react-router-dom";

function Frontpage() {
    return (
      <div>
          <Link to="/posts">
            Posts
          </Link>
          <Link to="/comments">
            Comments
          </Link>
      </div>
    );
  }
  
  export default Frontpage;
  