import React,{ useState,useRef,useMemo } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet';
import { Link ,useHistory} from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useDispatch, useSelector } from "react-redux";

import Alert from '@material-ui/lab/Alert';

import { locationUpdated } from "./locationSlice";

function LocationMarker(props) {
  const [position, setPosition] = useState(props.position);
  const [address, setAddress] = useState("no address selected");
 
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend(event) {
        const latlng = markerRef.current.getLatLng()

        fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${latlng.lat}&lon=${latlng.lng}&zoom=17&format=jsonv2`)
        .then(res => res.json())
        .then(
          (res) => {
            props.setedit(
              event.target.options.locid,
              event.target.options.item.category,
              [latlng.lat,latlng.lng],
              event.target.options.item.name,
              res.display_name
            )            

          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )        

        // props.setcat(
        //   event.target.options.item.category
        // )
        // props.setname(
        //   event.target.options.item.name
        // )        
        // const marker = markerRef.current
        // if (marker != null) {
        //   setPosition(marker.getLatLng())
        // }
      },
      click(event) {

        props.setedit(
          event.target.options.locid,
          event.target.options.item.category,
          event.target.options.item.coor,
          event.target.options.item.name,
          event.target.options.item.address
        )  
      }
    }),
    [],
  )
  return position === null ? null : (
    <Marker position={position} draggable={true} eventHandlers={eventHandlers} ref={markerRef} locid={props.loc} item={props.item}>
      <Popup>{address}</Popup>
    </Marker>
  )
}


export function EditLocation(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [age, setAge] = useState([]);
  const [name, setName] = useState("");
  const [coor, setCoor] = useState([0,0]);
  const [locid, setLocid] = useState(null);
  const [address, setAddress] = useState("");
  const handleAddress = (e) => setAddress(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleChange = (event) => {
    setAge(event.target.value);
  }; 
  const { entities } = useSelector((state) => state.categories);

  const setEdit = (locid,categories,coor,name,address)=>{
    setLocid(locid);
    setAge(categories);
    setName(name);
    setAddress(address);
    setCoor(coor);
  }
  const upadtelocation = ()=>{

    dispatch(
      locationUpdated({
        id: locid,
        category:age,
        name,
        address,
        coor

      })
    );
    props.reset_selection()
    history.push("/locations");

  }
  return (

    <div className="container">
      <div className="row">
        <h1>Edit Locations</h1>
      </div>
      <div className="row" >
        {
          props.selection.length>0?
          <MapContainer style={{"height":"50vh"}}
          center={{ lat: props.selection[0].coor[0], lng: props.selection[0].coor[1] }}
          zoom={10}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.selection.map(x=>
            (  <LocationMarker 
              position={x.coor}
              key={x.id} 
              loc={x.id} 
              onlocedit={props.onlocedit} 
              item={x} 
              setedit={setEdit}

              />)
            )}
        </MapContainer>:null
        }

      </div>  
      {
        age.length>0?
        <FormControl >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          multiple
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
      <button className="button-primary" onClick={upadtelocation} >Submit Change</button>
      </FormControl>:<Alert severity="error">click or move one of the location markers to change its location</Alert>        
      }

      <div className="row" >
      <Link to="/locations" onClick={props.reset_selection}>
            <button className="button-primary">back to Locations</button>
      </Link>  

      </div>  


    </div> 

  );
}



