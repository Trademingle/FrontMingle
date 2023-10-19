import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "./posting.module.css";
import SearchIcon from '@material-ui/icons/Search'; 
import CustomizedHook from "./search";

const drawerWidth = 330;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop:80,
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
    zIndex:3
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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

const PersistentDrawerLeft=(props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
      style={{ background: 'inherit', height: '1px' }}
        // position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
       
        <IconButton className={clsx(styles.open_button, open && classes.hide)} onClick={handleDrawerOpen}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
            <div className={classes.toolbar}>
              <IconButton className={styles.close_button} onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <div>
          <div className={classes.toolbar} />
          <div className={styles.sideBar}>
            <form className={styles.typeOfWorkField0}>
                  <p className={styles.sideBarh1}>Type of work</p>
                  <SearchIcon className={styles.search_icon}/>
                  <CustomizedHook placeholder="Add job filters"/>
                  {/* <input  className={styles.searchBox} type="search" placeholder="Add job filters"  />    */}
            </form>
            <form className={styles.typeOfWorkField1}>
              <hr style={{marginRight:0, marginTop:20}}/>
                  <p className={styles.sideBarh1}>Skills</p>
                  <SearchIcon className={styles.search_icon}/>
                  <CustomizedHook placeholder="Add job filters"/>
                  {/* <input  className={styles.searchBox} type="search" placeholder="Add job filters"  />    */}
            </form>
            <form className={styles.typeOfWorkField2}>
              <hr style={{marginRight:0, marginTop:20}}/>
                  <p className={styles.sideBarh1}> Language preferances </p>
                  <SearchIcon className={styles.search_icon}/>
                  <CustomizedHook placeholder="Add language filters"/>
                  {/* <input  className={styles.searchBox} type="search" placeholder="Add job filters"  />    */}
            </form>

          </div>
            {/* <ContractorCard servicetag1='Electricians' servicetag2='Plumbing' servicetag3='Alarm Systems' /> */}

            
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {props.insidePage}
      </main>
    </div>
  );
}

export default PersistentDrawerLeft;