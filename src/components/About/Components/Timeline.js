import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Heading from "./Layout/Heading";
import { TIMELINE_CONTENT } from "./timelineContent";
import aboutSketch from "../images/aboutSketch.svg";
import styles from '../About.module.css'

const TimelineComponent = () => {
  return (
    <React.Fragment>
      <Heading
        section="timeline"
        heading=" History"
        subheading="Have a look at our journey so far"
      />
      <Row className={styles.timeline_container}>
        <Col xs={12} sm={10} md={8} lg={5} className={styles.timeline_card_container}>
          <div className={{...styles.timeline_summary_container, ...styles.timeline_card}}>
            <h3 className={styles.timeline_summary_heading}>A brief history</h3>
            <hr className={styles.timeline_summary_hr} />
            <p className={styles.timeline_summary_content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </Col>
        {TIMELINE_CONTENT.map((milestone, index) => {
          return (
            <Col
              key={index}
              xs={12}
              sm={7}
              md={6}
              lg={4}
              className={styles.timeline_card_container}
            >
              <div className={styles.timeline_card}>
                <p className={styles.timeline_card_content}>{milestone.brief}</p>
                <h4 className={styles.timeline_year}>{milestone.year}</h4>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Image
          alt="Community Sketch"
          className={styles.about_sketch}
          src={aboutSketch}
        />
      </Row>
    </React.Fragment>
  );
};

export default TimelineComponent;
