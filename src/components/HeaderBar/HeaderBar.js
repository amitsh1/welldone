import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link ,useHistory } from "react-router-dom";

import { useDispatch} from "react-redux";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = (id) => {   
    dispatch(props.redobj({ id:id.length?id:[id] }));
    history.push("/"+props.prefix)
    props.ondelete();
    
  };
  const handleClose = (clicked) => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.selected?props.selected:capitalizeFirstLetter(props.prefix)}
          </Typography>
                  
        </Toolbar>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={handleClose}>           
        <Link to={`/${props.prefix}/add-user`}>
            <button className="button-primary">Add</button>
          </Link>           
        </MenuItem>
        {props.selected_id?(
            <MenuItem  onClick={handleClose}>
            <Link to={`/${props.prefix}/view-user/${props.selected_id}`}>
                        <button className="button-primary">View</button>
        </Link>
            </MenuItem>

        ) :null}  
        {props.selected_id?(
            <MenuItem onClick={handleClose} >
            <Link to={`/${props.prefix}/edit-user/${props.selected_id}`}>
                        <button className="button-primary">Edit</button>
        </Link> 
            </MenuItem>

        ) :null}  
        
        {props.selected_id?(
            <MenuItem  onClick={handleClose}>
          <button className="button-primary" onClick={() => handleDelete(props.selected_id)}>Delete</button>
            </MenuItem>

        ) :null}          

  

       
      </Menu>      
    </div>
  );
}