import React,{ useState,useRef,useMemo } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet';
import { Link } from "react-router-dom";

function LocationMarker(props) {
  const [position, setPosition] = useState(props.position);
  const [address, setAddress] = useState("no address selected");

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend(event) {
        console.log("ass",markerRef.current,event.target.options.locid)
        // const marker = markerRef.current
        // if (marker != null) {
        //   setPosition(marker.getLatLng())
        // }
      },
    }),
    [],
  )
  return position === null ? null : (
    <Marker position={position} draggable={true} eventHandlers={eventHandlers} ref={markerRef} locid={props.loc}>
      <Popup>{address}</Popup>
    </Marker>
  )
}


export function EditLocation(props) {


  return (

    <div className="container">
      <div className="row">
        <h1>View Locations</h1>
      </div>
      <div className="row" >
        {
          props.selection.length>0?
          <MapContainer style={{"height":"50vh"}}
          center={{ lat: props.selection[0].coor[0], lng: props.selection[0].coor[1] }}
          zoom={13}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.selection.map(x=>
            (  <LocationMarker position={x.coor} key={x.id} loc={x.id} onlocedit={props.onlocedit}/>)
            )}
        </MapContainer>:null
        }

      </div>  


      <div className="row" >
      <Link to="/locations" onClick={props.reset_selection}>
            <button className="button-primary">back to Locations</button>
      </Link>  

      </div>  


    </div> 

  );
}



