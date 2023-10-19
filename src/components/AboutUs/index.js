import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Collapse, IconButton,} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import background from './background.jpg';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import homeowner from './Homeowner.jpeg';
import homebuilder from './homebuilder.jpeg';
import contractor from './contractor.jpeg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
    },
    appbar: {
        background: 'rgba(0,0,0,0.5)',
    },
    appbarWrapper: {
        justifyContent: 'space-between',
    },
    appbarTitle: {
        flexGrow: '1',
    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    greenText: {
        color: '#5AFF3D',
    },
    redText: {
        color: '#fc2803',
    },
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#383838',
        fontSize: '4.5rem',
    },
    goDown: {
        color: '#383838',
        fontSize: '3.5rem',
    },
    button: {
        color: '#fff',
        size: 'extrasmall',
        margin: '10px'
    },
    root2: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // [theme.breakpoints.down('sm')]: {
        //   flexDirection: 'column',
        // },
        marginTop: "8%"
      },
    header: {
        color: '#383838',
        fontSize: '2.5rem',
        position: 'absolute',
        left: '650px',
        top: '1000px',
      },
    root3: {
        maxWidth: 345,
      },
    media: {
        height: 200,
      },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
}));

export default function AboutUs() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div>
            <div className={classes.root} id="header">
                <Collapse
                    in={checked}
                    {...(checked ? { timeout: 2000 } : {})}
                    collapsedHeight={50}
                >
                    <div className={classes.container}>
                        <h1 className={classes.title}>
                            Trademingle
                        </h1>
                        <Scroll to="content" smooth={true}>
                            <IconButton>
                                <ExpandMoreIcon className={classes.goDown} />
                            </IconButton>
                        </Scroll>
                    </div>
                </Collapse>
            </div>
            <div className={classes.root2} id="content">
                <h1 className={classes.header}>Features</h1>
                <Container className={classes.root2} maxWidth="lg">
                    <Grid container spacing={4} className={classes.grid} >
                        <Grid item sm={12} md={4}>
                            <Card className={classes.root3}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={homeowner}
                                    title="Home Owner"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Home Owner
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Home Owner details ...
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {/* <Button size="small" color="primary">
                                    Share
                                    </Button>
                                    <Button size="small" color="primary">
                                    Learn More
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            <Card className={classes.root3}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={homebuilder}
                                    title="Home Builder"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Home Builder
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Home builder details...
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {/* <Button size="small" color="primary">
                                    Share
                                    </Button>
                                    <Button size="small" color="primary">
                                    Learn More
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            <Card className={classes.root3}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={contractor}
                                    title="Contractor"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Contractor
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        contractor details ...
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {/* <Button size="small" color="primary">
                                    Share
                                    </Button>
                                    <Button size="small" color="primary">
                                    Learn More
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                
            </div>
        </div>
    );
}