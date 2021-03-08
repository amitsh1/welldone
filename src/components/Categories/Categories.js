import React from 'react'; 
import HeaderBar from '../HeaderBar/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "../../features/users/AddUser";
import { EditUser } from "../../features/users/EditUser";
import { UserList } from "../../features/users/UserList";
import {ViewUser} from "../../features/users/ViewUser";
class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current_category_selection: null,
        selected_id:null
      };
      this.category_selected = this.category_selected.bind(this);
      this.change_name = this.change_name.bind(this);
      this.reset_id = this.reset_id.bind(this);
    }
 

    category_selected(id,category){
        this.setState({
            current_category_selection:category,
            selected_id: id
          });              
    }
    change_name(category){
        this.setState({
            current_category_selection:category
          });            
    }
    reset_id(){
      this.setState({
        selected_id: null,
        current_category_selection: null
      });        
    }
    render() {

      return (
        <Router>
        <div>
          <HeaderBar selected={this.state.current_category_selection} selected_id={this.state.selected_id} ondelete={this.category_selected}/>
          <Switch>
            <Route path="/categories/add-user">
              <AddUser />
            </Route>
            <Route path="/categories/edit-user">
              <EditUser change_name={this.change_name} reset_id={this.reset_id}/>
            </Route>
            <Route path="/categories/view-user">
              <ViewUser reset_id={this.reset_id} />
            </Route>            
            <Route path="/categories/">
              <UserList onselect={this.category_selected} />
            </Route>          
          </Switch>
        </div>
      </Router>
);
    }
  }
  
export default Categories;