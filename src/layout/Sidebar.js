import React, {useContext} from 'react';
import {Link as LinkRouter } from "react-router-dom"
import {UserContext} from '../context/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MovieIcon from '@material-ui/icons/Movie';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import GameIcon from '@material-ui/icons/Gamepad';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Sidebar= ({path}) => {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [open,setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MainListItems = () =>{
      return(
          <div>
            <ListItem button component={LinkRouter} to={`${path.url}`}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={LinkRouter} to={`${path.url}movies`}>
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText primary="Movies" />
            </ListItem>
            <ListItem button component={LinkRouter} to={`${path.url}games`}>
              <ListItemIcon>
                <GameIcon />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem button component={LinkRouter} to={`${path.url}change-password`} >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            </div>
        );
  }
  
  const SecondaryListItems = () => {
    return(
        <div>
          <ListItem button component={LinkRouter} to={`${path.url}change-password`} >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
        </div>
      );
} 

  return (
    <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems/></List>
        {
          
          user ? <><Divider /><List><SecondaryListItems/></List></> : null  
        }
        
      </Drawer>
      
  );
}

export default Sidebar