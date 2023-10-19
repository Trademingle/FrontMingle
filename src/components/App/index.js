import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import NavBar from '../Navigation';
import Landing from '../Landing'; 

// Commenting out the unused imports for clarity. Uncomment as needed.
/*
import SignUpPage from '../SignUp';
import ContractorActiveJobsPage from '../ContractorActiveJobsPage'; 
import SignIn from '../Login';
import MyProfile from '../MyProfile';
import MyProfileClient from '../MyProfileClient';
import PostingPage from '../PostingPage';
import InboxPage from '../Inbox';
import * as ROUTES from '../../constants/routes';
import NewMap from '../Maps';
import ContractorExplorePage from '../ContractorExplorePage'; 
import HomeOwnerExplorePage from '../HomeOwnerExplorePage'; 
import Review from '../Review';
import AListing from '../AddListing';
import SearchResults from '../SearchResults';
import homeowneractivejobs from '../HomeOwnerActiveJobsPage';
import Cprofile from "../ProfileView";
import ClientProfile from "../ProfileViewClient";
import ActivePosting from "../PostingPage_Active";
import CompletedPosting from "../PostingPage_Completed";
import UnassignedPosting from "../PostingPage_Unassigned";
import PendingPosting from "../PostingPage_Pending";
import About from "../AboutUs";
import Footer from '../Footer';
import Invoice from "../Invoice";
import Report from '@material-ui/icons/ReportProblem';
import Popup from "reactjs-popup";
import ReportForm from '../ReportForm';
*/

// Commenting out the unused style for now. Uncomment as needed.
/*
const contentStyle = {
    width: '702px',
    height: 'auto',
    background: '#FFFFFF',
    borderRadius: '16px',
};
*/

const App = () => {
    return  (    
        <React.Fragment>
            <Router>      
                <NavBar />

                {/* Only the Landing page is active */}
                <Route exact path="/" component={Landing} />
                <Route exact path="/Landing" component={Landing} />

                {/* Commented out other routes, redirects, and components
                ... 
                */}
            </Router>
        </React.Fragment>
    )
};
   
export default App;
