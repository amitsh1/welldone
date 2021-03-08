import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { categoryUpdated } from "./categoriesSlice";
import { Link } from "react-router-dom";
export function EditCategory(props) {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/categories/edit-user/", ""));

  const user = useSelector((state) =>
    state.categories.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

  const handleClick = () => {
    if (name) {
      dispatch(
        categoryUpdated({
          id: userId,
          name,
        })
      );
      props.change_name(null);

      setError(null);
      history.push("/categories");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit Category</h1>
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
            Save Category
          </button>
          <Link to="/categories" onClick={props.reset_id}>
            <button className="button-primary">back to Categories</button>
          </Link>             
        </div>
      </div>
    </div>
  );
}
