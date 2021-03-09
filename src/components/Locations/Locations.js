import React from 'react'; 
import HeaderBar from '../HeaderBar/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddLocation } from "../../features/locations/AddLocation";
import { ViewLocation } from "../../features/locations/ViewLocation";
import { EditLocation } from "../../features/locations/EditLocation";
// import { LocationList } from "../../features/locations/LocationList";
import LocationTable from "../LocationTable/LocationTable";




class Locations extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        row_selection: [],
        selected_row_ids:[],
        all_is_selected:false
      };
      
      // this.location_selected = this.location_selected.bind(this);
      // this.change_name = this.change_name.bind(this);
      this.reset_id = this.reset_id.bind(this);
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
    reset_id(item){
      if (item.length){
        this.setState({
          all_is_selected:!(this.state.all_is_selected || item.length==this.state.row_selection.length),
          row_selection:!(this.state.all_is_selected || item.length==this.state.row_selection.length)?item:[]
        });      
      }
      else {
        var new_row_sel = this.state.row_selection.includes(item) ? this.state.row_selection.filter(i => i !== item) : [ ...this.state.row_selection, item ];
        this.setState({
          all_is_selected:this.state.all_is_selected?false:this.state.all_is_selected,
          row_selection:new_row_sel
        });   
    
       }
     
    }

    render() {

      return (
        <Router>
          <HeaderBar selected={this.state.current_location_selection} selected_id={this.state.row_selection.length==0?null:"selected locations"} ondelete={this.location_selected} prefix="locations"/>
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
              <h1>asda</h1>
              <LocationTable onselect={this.reset_id}  />
            </Route>                

          </Switch>
      </Router>
);
    }
  }
  
export default Locations;
