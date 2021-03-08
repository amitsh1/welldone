import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { Link } from "react-router-dom";
export function ViewLocation(props) {
  const { pathname } = useLocation();
  const locationId = parseInt(pathname.replace("/categories/view-location/", ""));

  const location = useSelector((state) =>
    state.locations.entities.find((location) => location.id === locationId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(location.name);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);



  return (
    <div className="container">
      <div className="row">
        <h1>View Location</h1>
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
          {error}
          <Link to="/locations" onClick={props.reset_id}>
            <button className="button-primary">back to Locations</button>
          </Link>             
        </div>
      </div>
    </div>
  );
}
