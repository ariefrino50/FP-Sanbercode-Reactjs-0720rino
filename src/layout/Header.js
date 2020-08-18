import React, {useContext} from 'react';
// import './css/header.css';
import {UserContext} from '../context/UserContext'

import { useHistory, Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'black'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useContext(UserContext)
    const history=useHistory()
    const handleLogout=()=>{
        setUser("belum");
        history.push("/");
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className="test"
            >
                <Toolbar>
                    { user==="sudah" &&<IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Typography variant="h6" style={{ marginLeft: "77%" }}>
                        
                        <Button style={{color:"white"}} href="/movie/list">Movie List</Button>
                        <Button style={{color:"white"}} href="/game/list">Game List</Button>
                        { user==="belum" && <>
                        <Button style={{color:"white"}} href="/login">Login</Button></>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
            { user==="sudah" && <Drawer
                className="changewarna"
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <main
                className={clsx(classes.content, { [classes.contentShift]: open,})}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        Admin {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem >
                        <ListItemIcon><MovieIcon /></ListItemIcon>
                        <ListItemText><Link to="/movie/movietable">Table Movie</Link></ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem >
                        <ListItemIcon><VideogameAssetIcon /></ListItemIcon>
                        <ListItemText><Link to="/game/gametable">Table Game</Link></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem >
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText>
                            <a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a>
                        </ListItemText>
                    </ListItem>
                </List>
                </main>
            </Drawer>}
        </div >
    );
}
