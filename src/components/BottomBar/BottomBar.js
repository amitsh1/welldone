import React,{useCallback}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100vw',
  },
});

export default function BottomBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const history = useHistory();
  const handleOnClick = useCallback((newValue) => history.push('/'+newValue), [history]);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
          if (newValue!=value){
            setValue(newValue);
            handleOnClick(newValue);
          }

      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Categories" icon={<RestoreIcon />} value="categories"/>
      <BottomNavigationAction label="Locations" icon={<FavoriteIcon />} value="locations"/>
    </BottomNavigation>
  );
}
