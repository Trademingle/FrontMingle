import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
// import GithubIcon from "../images/github.svg";
// import SlackIcon from "../images/slack.svg";
import BannerImage from "../images/homeBanner.svg";
import styles from '../About.module.css'
const HomeBannerComponent = () => {
  return (
    <React.Fragment>
      <Row className={styles.main_content}>
        <Col md={6}>
          <h1 className={styles.home_heading}>
            The Right People. <br /> The Right Time.
          </h1>
          <hr className={styles.home_hr} align="left" />
          <p className={styles.home_subheading}>
            Trademingle is a platform to connect clients in need of workers with talented and reliable trades people.
            Search for a person by the type of work that they do and be confident in knowing who your hiring
            by their portfolio of completed work and the reviews they have garnered in the past.
          </p>
          {/* <Button
            className={styles.home_github_button}
            href="https://github.com/codeuino"
          >
            <Image
              src={GithubIcon}
              className={styles.home_github_icon}
              alt="Github Icon"
            />
            Github
          </Button>
          <Button
            className={styles.home_slack_button}
            href="http://slack.codeuino.org/"
          >
            <Image
              src={SlackIcon}
              className={styles.home_slack_icon}
              alt="Slack Icon"
            />
            Slack
          </Button> */}
        </Col>
        <Col md={6} className={styles.home_image_container}>
          <Image
            src={BannerImage}
            className={styles.home_banner}
            alt="Community Banner"
            width = "360" height="224"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.home_mission}>
            <Row>
              <Col md={4} lg={3}>
                <h1 className={styles.home_mission_heading}>
                  Our <br /> Mission
                </h1>
              </Col>
              <Col md={8} lg={9}>
                <p className={styles.home_mission_content}>
                  Trademingle' mission is to bring transparency to a fragmented and over-the-counter marketplace
                  of skilled labour. By allowing contractors to advertise their services on an open platform,
                  you can rest assured that who you're hiring is exactly who you see in the profile.
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HomeBannerComponent;
