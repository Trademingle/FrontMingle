import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import styles from './landing.module.css'; 
import SearchBar from "./searchbar"; 
import ContractorCard from './contractorCard';
import Banners from './banners';
import api from '../api/api';
import LoadingView from '../ResuableComponents/loadingView';

export default function Landing() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        // <div className={styles.maindiv}>
            <PageWrap/>
        // </div>
    )
}
const PageWrap = () => {
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
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
      },[]);
    function renderFeaturedContrators() {
        let i = 0;
        let contractorCount = Contractors.length;
        let tempContractors = [];
        if(contractorCount === 0){
            return("It looks like there are no contractors near you.")
        }
        else{
            while (i < contractorCount) {
                let contractor = Contractors[i];
                let name = contractor.firstName + " " + contractor.lastName
                let rating = contractor.averageRating
                let reviews= contractor.numberOfReviews
                let avatar = contractor.downloadurl
                tempContractors.push(
                    <Grid item>
                        <ContractorCard avatar={avatar} contractorId={contractor.id} name={name} rating={rating} reviews={reviews} serviceList={contractor.serviceTypeList}/>
                    </Grid>
                );
                i += 1;
            }
            return tempContractors;
        }
    };
    return (
    <React.Fragment>
        <div className={styles.contentwrapper}>
            <div><SearchBar/></div>
            <div className={styles.textpic}>
                <div className={styles.textbox}>
                    <h1 className={styles.header1}>We’ll help you get stuff done.</h1>
                    <p className={styles.p1}>We help homeowners and homebuilders find the right contractors for the job. 
                        We know home projects can be stressful, so we designed Trademingle to make 
                        your experience great from start to end.</p>
                    <h1 className={styles.header2}>For contractors, we’ll help your business grow.</h1>
                    <p className={styles.p2}>If you’re a contractor, our app makes it easy for you to keep a tab on all your 
                        jobs and rewards you for quality work and effort, not just a big name. 
                        Our affordable premium plan lets you expand your business outside of the limitations of city borders.</p>
                </div>    
                <box className={styles.builder}></box>
            </div>
            {/* <button className={styles.premiumbutton}><StarIcon style={{color:"white",marginRight:5, marginTop:6, fontSize:25}}/><p className={styles.getpremium}>Get premium</p></button> */}
            {/* <h1 className={styles.header3}>Featured Contractors In Your Area</h1>
            <div style={{marginTop:'10px', marginBottom:'20px'}}>
                <Grid container spacing={2} justify="space-between" alignItems="center">
                    {loading?<LoadingView />
                    :renderFeaturedContrators()}
                </Grid>
            </div> */}
            <Banners/>
        </div>
    </React.Fragment>
)}
