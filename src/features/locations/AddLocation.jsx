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

import Alert from '@material-ui/lab/Alert';

import Map from '../../components/Map/Map'
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
  const [category, setCategory] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };  
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [coor, setCoor] = useState(null);
  const [error, setError] = useState(null);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const { entities } = useSelector((state) => state.categories);
  const usersAmount = useSelector((state) => state.locations.entities.length==0?0:Math.max(...state.locations.entities.map(x=> x.id)))
  
  const handleClick = () => {
    
    if (name) {
      dispatch(
        locationAdded({
          id: usersAmount + 1,
          category:category,
          name,
          address,
          coor
        })
      );
      
      setError(null);
      history.push("/locations");
    } else {
      setError("Fill in all fields");
    }

    setName("");

  };
  const set_adress = (address,coor) => {
    setAddress(address);
    setCoor(coor)

  }
  return (
    <div className="container">
      <div className="row">
        <h1>Add Location</h1>
      </div>
      <div className="row">
      <Map handler={set_adress}/>
      </div>      
      <div className="row">
        <div className="three columns">
        
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={handleChange}
        >
          {
            entities.map(
              x=>(<MenuItem value={x.name} key={x.id}>{x.name}</MenuItem>)
            )
          }
        </Select>
      </FormControl>
      <label htmlFor="nameInput">Address</label>
          <input
            className="u-full-width"
            type="text"
            id="addressInput"
            onChange={handleAddress}
            value={address}
          />          
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          {error}
          {(name && coor && category.length>0)?          <button onClick={handleClick} className="button-primary">
            Add Location
          </button>: <Alert severity="error">must enter name, coordinates(select on map) and category</Alert>}

          <Link to="/locations">
            <button className="button-primary">back to Locations</button>
          </Link>            
        </div>
      </div>
    </div>
  );
}
