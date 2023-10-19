import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './explore.module.css';
import SearchBar from '../Landing/searchbar';
import ExploreCard from './ExploreCard';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import api from '../api/api';
import { Grid } from '@material-ui/core';
import AddListingButton from '../ResuableComponents/addListingButton';
import LoadingView from '../ResuableComponents/loadingView';

const AddButton = withStyles((theme) => ({
    root: {
      borderRadius:5,
      backgroundColor: '#2B64D2',
      '&:hover': {
        backgroundColor: '#003ba0',
      },
    },
}))(Button);

//i dunno what API to use so used unassigned for now

const HomeOwnerExplorePage = () => {
  let [Contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadContractors = () => {
      api.getNearByCProfiles().then(res => {
        setContractors(res.data['nearby contractors']);
        setLoading(false);
      }).catch(err => {console.log(err); setLoading(false);})
  }
  useEffect(() => {
    setLoading(true);
    Contractors = [];
    setContractors(Contractors);
    loadContractors();
  },[]);
  function renderFeaturedContrators() {
      let i = 0;
      let contractorCount = Contractors.length;
      let tempTags = [];
      if(contractorCount === 0){
        return("It looks like there are no contractors near you.")
    }
    else{
      while (i < contractorCount) {
          let contractor = Contractors[i];
          tempTags.push(
              <Grid item>
                  <ExploreCard avatar={contractor.downloadurl} contractorId={contractor.id} name={contractor.firstName + " " + contractor.lastName} rating={contractor.averageRating} review={contractor.numberOfReviews} serviceList={contractor.serviceTypeList} />
              </Grid>
          );
          i += 1;
      }
      // tempTags.push(</Col>);
      console.log(tempTags);
      return tempTags;
    }
  };
    return (
    <div className={styles.contentwrapper}>
        <SearchBar />
        <div className={styles.headerDiv}>
          <h1 className={styles.header}>Contractors Near You</h1>
          <AddListingButton/>
        </div>
        <box className={styles.explorebox}>
            <box className={styles.explorecardbox}>
              {loading?<LoadingView/>
              :renderFeaturedContrators()}
            </box>
            {/* <box className={styles.adbox}>
                <box className={styles.ad}>
                    <p style={{fontSize:80}}>Ad</p>
                </box>
            </box> */}
        </box>

    </div>
    )
};
// }
export default HomeOwnerExplorePage;
