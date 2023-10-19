import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "../PostingPage/posting.module.css";
import SearchIcon from '@material-ui/icons/Search'; 
import CustomizedHook from "./search";
import SearchBody from "./body";
import GoogleMaps from '../LocationTextField';
import {allServiceTypes, allLanguages} from '../api/api';

import CustomizedHookLanding from "../Landing/search";

const drawerWidth = 330;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop:'-20px',
    overflowX:'hidden',
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
    position: 'fixed',
    marginTop:'0px',
    height: '100%',
    overflowX:'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 0.9,
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
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const service_types = localStorage.getItem('service_types');
  // const all_languages = localStorage.getItem('all_languages');

  const searchTerms = props.searchTerms;
  if ( !searchTerms ){
    window.location.href = '../Landing'
  }
  // function itemize(item) {
  //   return {title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()};
  // };
  // let [information, setInformation] = useState({"services": searchTerms.services, "languages": searchTerms.languages }); //{"services":[], "languages":[], }
  let [information, setInformation] = useState({...searchTerms})



  let services = [];
  let service_types = allServiceTypes();
  if ( service_types instanceof Array){
    services = service_types.map((item)=>{
      return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
    })
  }else{
    Promise.resolve(service_types).then(value => {
      service_types = [...value]
      let services = service_types.map((item)=>{
        return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
      })
      setOpts({services:services, languages:opts.languages})
      return service_types; //For promise chaining
    })
  }

  let languages = [];
  let all_languages = allLanguages();
  if ( all_languages instanceof Array){
    languages = all_languages.map((item)=>{
      return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
    })
  }else{
    Promise.resolve(all_languages).then(value => {
      all_languages = [...value]
      let languages = all_languages.map((item)=>{
        return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
      })
      setOpts({services:opts.services, languages:languages});
      return all_languages; //For promise chaining
    })
  }

  // let services = service_types.map((item)=>{
  //   return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
  // })
  // debugger;
  const all_options = {services:services, languages:languages}
  const [opts, setOpts] = useState(all_options)

  // useEffect(() => {
  //   debugger;
  //   const languages = all_languages.map((item)=>{
  //     return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
  //   })
  //   let services = []
  //   if( servicetypes instanceof Array){
  //     services = servicetypes.map((item)=>{
  //       return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
  //     })
  //   }

  //   setOpts({services, languages})
  // },[servicetypes, all_languages]);
  // const options_list = all_options[props.type]
  // let selected_option;
  // for (const option of options_list){
  //   if (option.title == props.selected){
  // // debugger;
  //     selected_option = option;
  //   }
  // }

  // let [Location, setLocation] = useState({}); 
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
                <div className={styles.typeOfWorkField0} >
                      <p className={styles.sideBarh1}>Type of work</p>
                      {/* <SearchIcon className={styles.search_icon}/> */}

                      <CustomizedHookLanding key={"service"+opts['services'].length}  
                        information={information} 
                        setInformation={setInformation} 
                        type='services'  
                        value={information['query']?information['query']:information['services'][0]}
                        placeholder='What is your project?'/> 
                      {/* <CustomizedHook key={"service"+opts['services'].length} 
                      information={information} setInformation={setInformation} options={opts['services']} selected={information['services'][0]} type='services'/>  */}
                </div>
                <form className={styles.typeOfWorkField1}>
                  <hr style={{marginRight:0, marginTop:20}}/>
                      <p className={styles.sideBarh1}>Location</p>
                      {/* <p>Get Premium to unlock this.</p> */}
                      <GoogleMaps type='side' className={styles.textbox2} information={information} setLocation={setInformation}/>
                      {/* <SearchIcon className={styles.search_icon}/>
                      <CustomizedHook placeholder="Add job filters"/> */}
                </form>
                <form className={styles.typeOfWorkField2}>
                  <hr style={{marginRight:0, marginTop:20}}/>
                      <p className={styles.sideBarh1}> Language preferances </p>
                      <SearchIcon className={styles.search_icon}/>
                      <CustomizedHook key={"language"+opts['languages'].length} 
                      information={information} setInformation={setInformation} options={opts['languages']} selected={information['languages'][0]}  type='languages'/> 
                </form>
              </div>
          </div>
      </Drawer>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
          {/* <SearchBody information={information} /> */}
      </div>
    </div>
  );
}

export default PersistentDrawerLeft;