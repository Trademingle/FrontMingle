import React from 'react';
import styles from './footer.module.css';
import { NavLink, Link } from 'react-router-dom';
import appleLogo from './appleLogo.png';
import googleLogo from './googleLogo.png';

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

const Footer = () => {
    return(
        <div className={styles.mainFooter}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <Link exact to="/landing" style={{ textDecoration: 'none' }}>
                        <div className={styles.col}>
                            <h3>Home</h3>
                        </div>
                    </Link>
                    <Link exact to="/About" style={{ textDecoration: 'none' }}>
                        <div className={styles.col}>
                            <h3>About</h3>
                        </div>
                    </Link>

                    <div className={styles.col}>
                        <h3>Contractor</h3>
                    </div>
                    <div className={styles.col}>
                        <h3>Apps</h3>
                    </div>
                </div>
                <div className={styles.images}>
                    <img src={appleLogo} className={styles.image1}/>
                    <img src={googleLogo} className={styles.image2}/>
                </div>
            </div>
            <div className={styles.EndText}>
                <p>&copy;{new Date().getFullYear()} Trademingle INC.</p> 
                <p>All rights reserved. Google, Google Play, YouTube and other marks are trademarks of Google Inc. </p>
            </div>
        </div>
)};


export default Footer;
export {Footer};