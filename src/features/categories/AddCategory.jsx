import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { categoryAdded } from "./categoriesSlice";
import { Link } from "react-router-dom";

export function AddCategory() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

  const usersAmount = useSelector((state) => state.categories.entities.length==0?0:Math.max(...state.categories.entities.map(x=> x.id)))
  
  const handleClick = () => {
    
    if (name) {
      dispatch(
        categoryAdded({
          id: usersAmount + 1,
          name,
        })
      );
      
      setError(null);
      history.push("/categories");
    } else {
      setError("Fill in all fields");
    }

    setName("");

  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Category</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          {error}
          <button onClick={handleClick} className="button-primary">
            Add Category
          </button>
          <Link to="/categories">
            <button className="button-primary">back to Categories</button>
          </Link>            
        </div>
      </div>
    </div>
  );
}
