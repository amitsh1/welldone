import React from 'react'; 
import Categories from '../Categories/Categories';
import Locations from '../Locations/Locations';
import BottomBar from '../BottomBar/BottomBar';
import { Route, BrowserRouter as Router, Switch,Redirect } from "react-router-dom";

class Main extends React.Component {
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
          <Switch>          
            <Route path="/categories/">
              <Categories />
            </Route>
            <Route path="/locations">
              <Locations />
            </Route>                   
            <Route path="/">
            <Redirect to="/locations" />
            </Route>            
          </Switch>
          <BottomBar />
      </Router>
);
    }
  }
  
export default Main;
