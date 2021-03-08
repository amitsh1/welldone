import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet';
import React,{ useState } from "react";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


function LocationMarker(props) {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [address, setAddress] = useState("no address selected");
    const map = useMapEvents({
      click(ev) {
        var latlng = map.mouseEventToLatLng(ev.originalEvent);
        
        
        fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${latlng.lat}&lon=${latlng.lng}&zoom=17&format=jsonv2`)
        .then(res => res.json())
        .then(
          (res) => {
            props.set_address(res.display_name,[latlng.lat,latlng.lng])
            setAddress(res.display_name);
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
                      
        setPosition(ev.latlng)
      }
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    )
  }
  

class Map extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };

    }
 



    render() {

      return (
        <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker set_address={this.props.handler}/>
      </MapContainer>
);
    }
  }
  
export default Map;


