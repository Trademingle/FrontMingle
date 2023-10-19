import React from "react";
import Heading from "./Layout/Heading";
import { Row, Col, Image } from "react-bootstrap";
import spansberryImage from "../images/spansberry.png";
import codebadgeImage from "../images/Codebadge.png";
import donutImage from "../images/donut.jpg";
import designImage from "../images/designSketch.svg";
import styles from '../About.module.css'

const Projects = () => {
  return (
    <React.Fragment>
      <Heading
        section="projects"
        heading="Our Projects"
        subheading="Have a look at the amazing products we have built"
      />
      <Row className={styles.project_container}>
        <Col md={6} className={styles.project_image_container}>
          <Image
            src={donutImage}
            className={styles.project_image}
            alt="Donut Platform"
          />
        </Col>
        <Col md={6} className={styles.project_card}>
          <h2 className={styles.project_heading}>Donut</h2>
          <h6 className={styles.project_subheading}>
            Open source, community-oriented social media platform
          </h6>
          <p>
            Donut is an open-source, feature-rich, highly flexible and
            privacy-friendly, social networking platform built for
            community-oriented collaboration in a customized way. It has been
            built on the Node.js framework allowing an essential impetus to
            provide custom and friendly rich widgets and an expansive library of
            modules to make communication and collaboration easy and successful.
            With a powerful module system, you can customize this platform by
            using third party tools, writing your own or integrating other
            software.
          </p>
          <div className={styles.project_anchor_container}>
            <a
              href="https://github.com/codeuino/social-platform-donut-frontend"
              className={styles.program_anchor_text}
            >
              Frontend
            </a>
            <a
              href="https://github.com/codeuino/social-platform-donut-backend"
              className={styles.program_anchor_text}
            >
              Backend
            </a>
            <a
              href="https://www.figma.com/file/iZvb7rLYRp3Di3wILVQ7V9/CodeUino-Donut"
              className={styles.program_anchor_text}
            >
              Design
            </a>
            <a
              href="https://www.youtube.com/watch?v=wYk71_KY6Bk"
              className={styles.program_anchor_text}
            >
              Youtube
            </a>
            <a
              href="https://docs.codeuino.org/documentation/donut-docs/donut-documentation"
              className={styles.program_anchor_text}
            >
              Documentation
            </a>
          </div>
        </Col>
      </Row>
      <Row className={styles.project_container}>
        <Col md={6} className={styles.project_card}>
          <h2 className={styles.project_heading}>CodeBadge</h2>
          <h6 className={styles.project_subheading}>
            Tool for measuring contributor's health in the community
          </h6>
          <p>
            Codebadge is an open-source, user-friendly, visual-oriented
            collaboration tool which incorporates development of badges and
            integrating with forums in a customized way. Codebadge communicate
            skills, achievements and contribution tracking by providing visual
            symbols of accomplishments packed with verifiable data and evidence
            that can be shared across the web. It is a standard
            organization-oriented project that provides an essential impetus to
            Admins and users with an appropriate dashboards.
          </p>
          <div className={styles.project_anchor_container}>
            <a
              href="https://github.com/codeuino/codebadge-frontend"
              className={styles.program_anchor_text}
            >
              Frontend
            </a>
            <a
              href="https://github.com/codeuino/codebadge-backend"
              className={styles.program_anchor_text}
            >
              Backend
            </a>
            <a
              href="https://www.figma.com/file/rvyLIe0MxcB7vAl2ut24VY/CodeUino-CodeBadge?node-id=0%3A1"
              className={styles.program_anchor_text}
            >
              Design
            </a>
            <a
              href="https://www.youtube.com/watch?v=s1gDGjJtmpk"
              className={styles.program_anchor_text}
            >
              Youtube
            </a>
            <a
              href="https://docs.codeuino.org/documentation/codebadge/codebadge-documentation"
              className={styles.program_anchor_text}
            >
              Documentation
            </a>
          </div>
        </Col>
        <Col md={6} className={styles.project_image_container}>
          <Image
            src={codebadgeImage}
            className={styles.project_image}
            alt="CodeBadge Platform"
          />
        </Col>
      </Row>
      <Row className={styles.project_container}>
        <Col md={6} className={styles.project_image_container}>
          <Image
            src={spansberryImage}
            className={styles.project_image}
            alt="Spansberry Platform"
          />
        </Col>
        <Col md={6} className={styles.project_card}>
          <h2 className={styles.project_heading}>Spansberry</h2>
          <h6 className={styles.project_subheading}>
            Open source, community-oriented discussion platform
          </h6>
          <p>
            Spansberry is a community-oriented discussion platform that comes
            with an intelligent dashboard mechanism that helps manage the
            ongoing discussions in organized and structural ways. Within the
            discussion forum, it allows tracking and assigning tasks within the
            discussion forum from the replied thread itself. It helps review
            team workload alongside creating polls and surveys, and schedule
            draft messages inside the discussions. The exuberant feature of this
            project is that it helps turn a new or existing message within the
            ongoing discussion into a task, set a deadline for any user, assign
            it to a teammate or anyone, and much more.
          </p>
          <div className={styles.project_anchor_container}>
            <a
              href="https://github.com/codeuino/community-forum-frontend"
              className={styles.program_anchor_text}
            >
              Frontend
            </a>
            <a
              href="https://github.com/codeuino/community-forum-backend"
              className={styles.program_anchor_text}
            >
              Backend
            </a>
            <a
              href="https://www.figma.com/file/iZvb7rLYRp3Di3wILVQ7V9/CodeUihttps://www.figma.com/file/mctd10gi5LjvAmZzaxC7vS/Forums-Project-Donut?node-id=0%3A1no-Donut"
              className={styles.program_anchor_text}
            >
              Design
            </a>
            <a href="#" className={styles.program_anchor_text}>
              Youtube
            </a>
            <a href="#" className={styles.program_anchor_text}>
              Documentation
            </a>
          </div>
        </Col>
      </Row>
      <Row className={styles.project_design_container}>
        <Col md={7}>
          <h3 className={styles.project_design_heading}>Design Project</h3>
          <h6 className={styles.project_design_text}>COMING SOON</h6>
          <p>
            To all the designers in the world something big is coming soon!
            Update your tools for the battle.
          </p>
        </Col>
        <Col md={5} className={styles.project_design_image_container}>
          <Image
            src={designImage}
            className={styles.project_design_image}
            alt="Design Sketch"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Projects;
