import React from 'react'; 
import HeaderBar from '../HeaderBar/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddLocation } from "../../features/locations/AddLocation";

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
        <div>
          <HeaderBar selected={this.state.current_location_selection} selected_id={this.state.selected_id} ondelete={this.location_selected} prefix="locations"/>
          <Switch>
            <Route path="/locations">
              <AddLocation />
            </Route>        
          </Switch>
        </div>
      </Router>
);
    }
  }
  
export default Locations;
