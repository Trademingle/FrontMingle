import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import styles from './landing.module.css'; 
import construction from './construction.png';
import contractor from './contractor.png';
import homebuilder from './homebuilder.png';
import homeowner from './homeowner.png';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
      background:'#2B64D2',
    },
    babyCards:{
        background:'#2B64D2',
        maxWidth: '600px',
        minWidth: '200px',
        textAlign:'center',
        position: 'relative',
        height:'300px',
    }
}));
export default function Banners ()  {
    const classes = useStyles();
    return(
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <h1 className={styles.firstBannerH1}>What is Trademingle?</h1>
                        <p className={styles.firstBannerP}> Trademingle is a dedicated platform that bridges the gap
                         between homeowners, homebuilders, and skilled contractors. Recognizing the challenges often faced
                          in home projects, Trademingle offers a streamlined process to match users with the right professionals,
                          ensuring quality and reliability. For contractors, the platform not only offers an organized system to manage
                           jobs but also values and rewards quality work and effort. This unique approach sets Trademingle apart, emphasizing bot
                           h quality and expansion. The affordable premium plan provided
                         allows contractors to grow their business, breaking free from the constraints of city borders and tapping into a larger customer base.</p>
                    </Grid>
                    <Grid item xs>
                        <img src={construction} className={styles.firstBannerImg} alt=''/>
                    </Grid>
                </Grid>
                </CardActionArea>
            </Card>
            {/* <h1 className={styles.header3}>Who are you?</h1> */}
            <div className={styles.secondBanner}>
                <Grid container spacing={5}>
                    <Grid item xs>
                        <Card className={classes.babyCards}>
                            <CardActionArea>
                                <img src={homeowner} className={styles.secondBannerImg} alt=''/>
                                <h2 className={styles.centeredText}>Home Owner</h2>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.babyCards}>
                            <CardActionArea>
                                <img src={homebuilder} className={styles.secondBannerImg} alt=''/>
                                <h2 className={styles.centeredText}>Home Builder</h2>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.babyCards}>
                            <CardActionArea>
                                <img src={contractor} className={styles.secondBannerImg} alt=''/>
                                <h2 className={styles.centeredText}>Contractor</h2>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
