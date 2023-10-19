
import React from 'react';
import Popup from 'reactjs-popup';
import styles from './notf.module.css';

const contentStyle2 = {
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
};

export default function NotFound(props){
    return(
        <Popup open={props.open} modal contentStyle={contentStyle2}>
	        <div className={styles.container}>
			    <h1 className={styles.h1}>404</h1>	
                <box className={styles.img}/>
                <h3 className={styles.h3}>Look like you're lost</h3>
                <p className={styles.p}>The page you are looking for is not available!</p>
                <a href="/landing" className={styles.home}>Go to Home</a>
	        </div>
        </Popup>
    )
}