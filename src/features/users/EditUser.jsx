import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";
import { Link } from "react-router-dom";
export function EditUser(props) {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

  const handleClick = () => {
    if (name) {
      dispatch(
        userUpdated({
          id: userId,
          name,
        })
      );
      props.change_name(null);

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
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
            Save user
          </button>
          <Link to="/" onClick={props.reset_id}>
            <button className="button-primary">back to Categories</button>
          </Link>             
        </div>
      </div>
    </div>
  );
}
