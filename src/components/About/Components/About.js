import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import Heading from "./Layout/Heading";
import styles from '../About.module.css'

const AboutComponent = () => {
  return (
    <React.Fragment>
      <Heading
        section="aboutUs"
        heading="About Us"
        subheading="Everything you need to know about Codeuino"
      />
      <Row className={styles.about_card_container}>
        <Col md={6} lg={4}>
          <div className={styles.about_card}>
            <h2 className={styles.about_card_heading}>What is Codeuino</h2>
            <p className={styles.about_card_content}>
              Codeuino is an Open Source Social Networking organisation that
              provides various robust frameworks solutions which could span the
              entire world through building all kinds of social environments,
              discussion portals and collaboration platforms by giving
              prospectus to various other organisations, users and outreaches to
              showcase their products in a custom way.
            </p>
          </div>
        </Col>
        <Col md={6} lg={4}>
          <div className={styles.about_card}>
            <h2 className={styles.about_card_heading}>Who are we</h2>
            <p className={styles.about_card_content}>
              We are a group of young open-source contributors creatively
              leveraging our expertise in Social networking and development
              projects to improve the quality of outreaching, interaction and
              collaboration for the people. We consist of various teams
              including but not limited to Development, Documentation, Designers
              and Community Managers. Everyone at Codeuino contributes to
              increase efficiency, outreaching for the user and expedite idea
              generation for social networking.
            </p>
          </div>
        </Col>
        <Col md={12} lg={4}>
          <div className={styles.about_card}>
            <h2 className={styles.about_card_heading}>What we do</h2>
            <p className={styles.about_card_content}>
              Codeuino takes into the house the development of some of the
              coolest
              <Link smooth to="/#projects" className={styles.anchor_text}>
                {" "}
                Open Source Projects{" "}
              </Link>
              that are made with the sole motive to benefit more and more people
              present all over the world. We build social networking Kit/FOSS
              for various organisations to build up the social environment for
              their organisation to showcase their products and services for
              their community along with the collaboration platform to interact
              with one another.
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AboutComponent;
