import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link ,useHistory } from "react-router-dom";
import { fetchUsers, userDeleted } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const [current, setCurrent] = React.useState("top");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = (id) => {
    history.push("/")
    props.ondelete(null,false);
    dispatch(userDeleted({ id }));
    
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
            {props.selected?props.selected:"Categories"}
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
        <Link to="/add-user" >
            <button className="button-primary">Add Category</button>
          </Link>           
        </MenuItem>
        {props.selected_id?(
            <MenuItem  onClick={handleClose}>
            <Link to={`/view-user/${props.selected_id}`}>
                        <button className="button-primary">View</button>
        </Link>
            </MenuItem>

        ) :null}  
        {props.selected_id?(
            <MenuItem onClick={handleClose} >
            <Link to={`/edit-user/${props.selected_id}`}>
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