import React from "react";
import Heading from "./Layout/Heading";
import { Row, Col } from "react-bootstrap";
import SlackIcon from "../images/slack.svg";
import GithubIcon from "../images/githubBlack.svg";
import ProgramCard from "./Programs/ProgramCard";
import styles from '../About.module.css'

const joinUsMethods = {
  slack: {
    image: SlackIcon,
    title: "Join Us on Slack",
    description: (
      <p>
        To get started, the first step is to meet the community. We use Slack to
        communicate, and there the helpful community will guide you. Slack is an
        instant messaging service used by developers and users of Github. Slack
        uses chat rooms, where developers can join in and can talk about a
        particular topic. Join Us on our{" "}
        <a href="http://slack.codeuino.org/" className={styles.anchor_text}>
          Slack Channel
        </a>{" "}
      </p>
    ),
  },
  github: {
    image: GithubIcon,
    title: "Contribute on Github",
    description: (
      <p>
        No contribution is a small contribution. Whether you're helping us fix
        bugs, improve the docs, or spread the word, we'd love to have you as
        part of the Codeuino community! Check out our{" "}
        <a href="https://github.com/codeuino" className={styles.anchor_text}>
          Github
        </a>{" "}
        for ideas on contributing and setup steps for getting our repositories
        up and running on your local machine.
      </p>
    ),
  },
};

const JoinUs = () => {
  return (
    <React.Fragment>
      <Heading
        section="joinUs"
        heading="Join Us"
        subheading="How can you join and get involved"
      />
      <Row className={styles.about_card_container}>
        <Col md={10} className={styles.join_container}>
          <Row>
            <Col sm={6}>
              <a href="http://slack.codeuino.org/">
                <ProgramCard program={joinUsMethods.slack} />
              </a>
            </Col>
            <Col sm={6}>
              <a href="https://github.com/codeuino">
                <ProgramCard program={joinUsMethods.github} />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default JoinUs;
