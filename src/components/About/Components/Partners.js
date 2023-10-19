import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Heading from "./Layout/Heading";
import wwcImage from "../images/wwc.jpeg";
import dgoceanImage from "../images/dgocean.svg";
import jetbrainsImage from "../images/jetbrains.png";
import gitbookImage from "../images/gitbook.png";
import linuxFoundationImage from "../images/LinuxFoundation.png";
import DonateCard from "./DonateUs/Donate";
import styles from '../About.module.css'

const Partners = () => {
  return (
    <React.Fragment>
      <Heading
        section="donate"
        heading="Our Backers"
        subheading="Codeuino's supporters and friends"
      />
      <Row className={styles.backer_row}>
        <Col lg={7} className={styles.backer_logo_container}>
          <Image
            className={styles.backer_logo}
            src={wwcImage}
            alt="Women Who Code Logo"
          />
          <Image
            className={styles.backer_logo}
            src={dgoceanImage}
            alt="Digital Ocean Image"
          />
          <Image
            className={styles.backer_logo}
            src={jetbrainsImage}
            alt="Women Who Code Logo"
          />
        </Col>
        <Col lg={5} className={styles.backer_logo_container}>
          <Image
            className={styles.backer_logo2}
            src={linuxFoundationImage}
            alt="Linux Foundation Image"
          />
          <Image
            className={{...styles.backer_logo2,...styles.backer_gitbook_logo}}
            src={gitbookImage}
            alt="Gitbook Image"
          />
        </Col>
      </Row>
      <DonateCard />
    </React.Fragment>
  );
};

export default Partners;
