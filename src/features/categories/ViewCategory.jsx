import { useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";

import { useState } from "react";
import { Link } from "react-router-dom";
export function ViewCategory(props) {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/categories/view-user/", ""));

  const user = useSelector((state) =>
    state.categories.entities.find((user) => user.id === userId)
  );



  const [name, setName] = useState(user.name);

  const handleName = (e) => setName(e.target.value);



  return (
    <div className="container">
      <div className="row">
        <h1>View Category</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            disabled
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <Link to="/categories" onClick={props.reset_id}>
            <button className="button-primary">back to Categories</button>
          </Link>             
        </div>
      </div>
    </div>
  );
}
