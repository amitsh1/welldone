import React from 'react'; 
import HeaderBar from '../HeaderBar/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddLocation } from "../../features/locations/AddLocation";
import { ViewLocation } from "../../features/locations/ViewLocation";
import { EditLocation } from "../../features/locations/EditLocation";
// import { LocationList } from "../../features/locations/LocationList";
import LocationTable from "../LocationTable/LocationTable";

import { locationDeleted } from "../../features/locations/locationSlice";


class Locations extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        row_selection: [],
        selected_row_ids:[],
        rowids:{},
        all_is_selected:false
      };
      
      // this.location_selected = this.location_selected.bind(this);
      // this.change_name = this.change_name.bind(this);
      this.onrowselection = this.onrowselection.bind(this);
      this.reset_selection = this.reset_selection.bind(this)
    }

 

    // location_selected(id,location){
    //     this.setState({
    //         current_location_selection:location,
    //         selected_id: id
    //       });              
    // }
    // change_name(location){
    //     this.setState({
    //         current_location_selection:location
    //       });            
    // }
    reset_selection(){
      this.setState({
        all_is_selected:false,
        row_selection:[]
      });       
    }
    onrowselection(item,rowids){
      
      this.setState({
        rowids:rowids,
        row_selection:item
      }); 

     
    }

    render() {

      return (
        <Router>
          <HeaderBar 
          selected={this.state.current_location_selection} 
          selected_id={this.state.row_selection.length===0?null:this.state.row_selection.map(x=>x.id)} 
          ondelete={this.reset_selection} 
          redobj = {locationDeleted}          
          // ondelete={this.location_selected} 
          prefix="locations"/>
          <Switch>
            <Route path="/locations/add-user">
              <AddLocation />
            </Route>   
            <Route path="/locations/edit-user">
              <EditLocation selection={this.state.row_selection} reset_selection={this.reset_selection}/>
            </Route>
            <Route path="/locations/view-user">
              <ViewLocation selection={this.state.row_selection} reset_selection={this.reset_selection}/>
            </Route>            
            <Route path="/locations/">
              <LocationTable onselect={this.onrowselection}  />
            </Route>                

          </Switch>
      </Router>
);
    }
  }
  
export default Locations;
