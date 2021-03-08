import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import React,{ useState } from "react";
import { locationAdded } from "./locationSlice";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export function AddLocation() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };  
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const { entities } = useSelector((state) => state.categories);
  const usersAmount = useSelector((state) => state.categories.entities.length==0?0:Math.max(...state.categories.entities.map(x=> x.id)))
  
  const handleClick = () => {
    
    if (name) {
      dispatch(
        locationAdded({
          id: usersAmount + 1,
          name,
        })
      );
      
      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");

  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Location</h1>
      </div>
      <div className="row">
        <div className="three columns">

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          {
            entities.map(
              x=>(<MenuItem value={x.name} key={x.id}>{x.name}</MenuItem>)
            )
          }
        </Select>
      </FormControl>

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
            Add Location
          </button>
          <Link to="/categories">
            <button className="button-primary">back to Categories</button>
          </Link>            
        </div>
      </div>
    </div>
  );
}
