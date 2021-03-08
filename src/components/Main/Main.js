import React from 'react'; 
import Categories from '../Categories/Categories';
import BottomBar from '../BottomBar/BottomBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

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
        <div>
          <Switch>          
            <Route path="/categories/">
              <Categories />
            </Route>
            <Route path="/locations">
              <h1>locations</h1>
            </Route>                   
            <Route path="/">
              <h1>ssdffasa</h1>
            </Route>            
          </Switch>
          <BottomBar />
        </div>
      </Router>
);
    }
  }
  
export default Main;
