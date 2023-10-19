import React, {useEffect, useState} from 'react';
import { Link , useHistory} from 'react-router-dom';
import styles from './nav.module.css';
import Popup from "reactjs-popup";
import SignUpPage from '../SignUp';
import SignIn from '../Login'; 
import api from '../api/api';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import NotificationMenu from '../Notifications/NotificationMenu';
// import { SwitchVideo } from '@material-ui/icons';
import LoadingView from '../ResuableComponents/loadingView';

export default function NavBar() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const history = useHistory();
  const handleOnSubmit = (event) => {
    setLoading(true)
    api.signOut()
    setLoading(false)
    history.replace({
      pathname: '/landing',
    });
    window.location.reload(false)
    };

    var profileId = {};
    profileId['id'] = localStorage.getItem('user_id');
    const [profiles, setProfiles] = useState([]);
    const getProfiles = () => {
        api.getProfiles(profileId).then(res => {
            setProfiles(res.data);
            let tempList = res.data.savedJobList
            localStorage.setItem('savedJobList', tempList);
            localStorage.setItem('defaultLanguageList', res.data.languageList);
        }).catch(err => console.log(err))
    }

    const [notifications, setNotifications] = useState([]);
    const [badgeContent, setBadgeContent] = useState(0);

    const getNotification = () => {
      api.getNotification().then(res => {
        setNotifications(res.data['notifications']); 
        console.log("Notification loaded successfully");
        console.log(res)
        for (const idx in res.data['notifications']){
          if((res.data['notifications'][idx].status&5) == 0){
            setBadgeContent(1)
          }
        }
      }).catch(err => console.log(err))
    }

    
    useEffect(() => {
        getProfiles();
        if ( localStorage.getItem('access-token') ){
          getNotification();
        }
    },[]);

      // let rating = profiles.averageRating
      // let jobsDone = profiles.jobsCompleted
    const text_truncate = function(str) {
      let length = 12;
      if (str == null) {
        str = '';
      }
      if (str.length > length) {
        return str.substring(0, length ) + "...";
      } else {
        return str;
      }
    };
    let contractorName = text_truncate(profiles.firstName)

    if (loading) {
      return <LoadingView/>;
    }
      
    return (
      <nav className={styles.navbar}>
        <div>
          {localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor' 
          ? <nav>
          <Link to='/contractorexplore' className={styles.booktrades}>Trademingle</Link>
          <div className={styles.frame}>
            <Popup 
            trigger={
                    <Badge className={styles.notificationsBadge}  badgeContent={badgeContent} color="secondary" overlap="circle" variant="dot">
                      < NotificationsIcon className={styles.notificationsIcon} style={{ fontSize: 30 }} color="primary" />
                    </Badge>
                    } 
            modal 
            contentStyle={contentStyle3}
            onClose={()=>{
              setBadgeContent(0);
            }}>
                {close => <NotificationMenu notifications={notifications} close={close} />}
            </Popup>
            <box  className={styles.boxTwo}>
              <div className={styles.dropdown}>
                <Link className={styles.dropbtn} to="/myprofile">
                  <img src={profiles.downloadurl} className={styles.profileImg} alt=""/> 
                  <p className={styles.dropbtntext}>{contractorName}</p>
                </Link> 
                <div className={styles.dropdownContent}>
                  <Link className={styles.dropButton} to="/myprofile"> 
                    <AccountBoxIcon className={styles.accountBoxIcon} style={{ fontSize: 25}}/>
                    My Profile
                  </Link>
                  <Link className={styles.dropButton} href='/Landing' onClick={handleOnSubmit}>
                    <ExitToAppIcon className={styles.accountBoxIcon} style={{ fontSize: 25}}/>
                    Sign Out</Link>
                </div>
              </div>
            </box>
            <Link to='/contractorexplore' className={styles.boxOne}>
            <p className={styles.iconText}>Find Jobs</p>
            < SearchIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
            </Link>
            <Link to='/InboxPage' className={styles.boxOne}>
            <p className={styles.iconText}>Inbox</p>
            < MailOutlineIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
            </Link>
            <Link to='/contractoractivejobs' className={styles.boxOne}>
            <p className={styles.iconText}> Jobs</p>
            < SupervisorAccountIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
            </Link>
            {/* <Link to='/' className={styles.boxOne}>
              Calendar 
            </Link>
            <CalendarTodayIcon className={styles.calendarIcon} style={{ fontSize: 20 }} />
            <Link to='/' className={styles.boxOne} >
              Bulletin Board
            </Link>
            <AppsIcon className={styles.boardIcon} style={{ fontSize: 20 }} />            */}
        </div>
      </nav>
      : localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Client'
      ? <nav>
        <Link to='/homeownerexplore' className={styles.booktrades}>Trademingle</Link>
        <div className={styles.frame}>
            <Popup 
              trigger={
                      <Badge className={styles.notificationsBadge}  badgeContent={badgeContent} color="secondary" overlap="circle" variant="dot">
                        < NotificationsIcon className={styles.notificationsIcon} style={{ fontSize: 30 }} color="primary" />
                      </Badge>
                      } 
              modal 
              contentStyle={contentStyle3}
              onClose={()=>{
                setBadgeContent(0);
              }}>
                  {close => <NotificationMenu notifications={notifications} close={close} />}
            </Popup>
          <box className={styles.boxTwo} > 
            <div className={styles.dropdown}>
                <Link className={styles.dropbtn} to="/myprofile">
                  <img src={profiles.downloadurl} className={styles.profileImg} alt=""/> 
                  <p className={styles.dropbtntext}>{contractorName}</p>
                </Link> 
              <div className={styles.dropdownContent}>
                <Link to="/myprofile"><AccountBoxIcon className={styles.accountBoxIcon}/>My Profile</Link>
                {/* <hr className={styles.dropLine}/> */}
                <Link className={styles.dropButton} to='/Landing' onClick={handleOnSubmit}>< ExitToAppIcon className={styles.accountBoxIcon}/>Sign Out</Link>
              </div>
            </div>
          </box>
          <Link to='/homeownerexplore' className={styles.boxOne}>
            <p className={styles.iconText}>Find Contractors</p>
            < SearchIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
          </Link>
          <Link to='/InboxPage' className={styles.boxOne}>
          <p className={styles.iconText}>Inbox</p>
            < MailOutlineIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
          </Link>
          <Link to='/homeowneractivejobs' className={styles.boxOne}>
          <p className={styles.iconText}>Jobs</p>
            < SupervisorAccountIcon className={styles.searchIcon} style={{ fontSize: 20 }} />
          </Link>
          {/* <Link to='/' className={styles.boxOne}>
            Calendar 
          </Link>
          <CalendarTodayIcon className={styles.calendarIcon} style={{ fontSize: 20 }} />
          <Link to='/' className={styles.boxOne} >
            Bulletin Board
          </Link>
          <AppsIcon className={styles.boardIcon} style={{ fontSize: 20 }} />    */}       
        </div>
    </nav>
        : <nav className={styles.navbar}>
          <Link to='/landing' className={styles.booktrades}>Trademingle</Link>
          <div className={styles.frame}>
              {/* <p className={styles.boxThree} onClick={()=>setOpen1(true)}> Sign up</p>
              <p className={styles.boxOne} onClick={()=>setOpen(true)}> Log in</p> */}
          </div>
          </nav> } 
          {/* <SignIn setOpen={setOpen} open={open}/>
          <SignUpPage setOpen={setOpen1} open={open1}/> */}
      </div>
    </nav>
  );
}

const contentStyle3 = {
  width: '400px',
  height: '680px',
  background: '#FFFFFF',
  borderRadius: '16px', 
};

