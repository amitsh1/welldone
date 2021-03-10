import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from "react-router-dom";
export function ViewLocation(props) {

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
            (      <Marker position={x.coor} key={x.id}>
              <Popup>{x.address}</Popup>
            </Marker>)
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



