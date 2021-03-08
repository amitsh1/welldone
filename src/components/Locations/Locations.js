import React from 'react'; 
import HeaderBar from '../HeaderBar/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddLocation } from "../../features/locations/AddLocation";
import { LocationList } from "../../features/locations/LocationList"
class Locations extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current_location_selection: null,
        selected_id:null
      };
      this.location_selected = this.location_selected.bind(this);
      this.change_name = this.change_name.bind(this);
      this.reset_id = this.reset_id.bind(this);
    }
 

    location_selected(id,location){
        this.setState({
            current_location_selection:location,
            selected_id: id
          });              
    }
    change_name(location){
        this.setState({
            current_location_selection:location
          });            
    }
    reset_id(){
      this.setState({
        selected_id: null,
        current_location_selection: null
      });        
    }
    render() {

      return (
        <Router>
          <HeaderBar selected={this.state.current_location_selection} selected_id={this.state.selected_id} ondelete={this.location_selected} prefix="locations"/>
          <Switch>
            <Route path="/locations/add-user">
              <AddLocation />
            </Route>   
            {/* <Route path="/locations/edit-user">
              <EditLocation change_name={this.change_name} reset_id={this.reset_id}/>
            </Route>
            <Route path="/locations/view-user">
              <ViewLocation reset_id={this.reset_id} />
            </Route>             */}
            <Route path="/locations/">
              <LocationList onselect={this.location_selected} />
            </Route>                

          </Switch>
      </Router>
);
    }
  }
  
export default Locations;
