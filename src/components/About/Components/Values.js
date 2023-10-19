import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { VALUES_CONTENT } from "./valuesContent";
import ValueTab from "./ValueTab";
import Heading from "./Layout/Heading";
import styles from '../About.module.css'

class ValueComponent extends React.Component {
  state = {
    currentActive: VALUES_CONTENT[0],
  };

  handleActive = (currentActiveTab) => {
    this.setState({ currentActive: currentActiveTab });
  };

  render() {
    return (
      <React.Fragment>
        <Heading
          section="values"
          heading="Our Values"
          subheading="Here are the values we believe in"
        />
        <Row>
          <Col xs={5} className={styles.value_tabs_container}>
            {VALUES_CONTENT.map((value) => {
              return (
                <ValueTab
                  value={value}
                  active={this.state.currentActive}
                  onActive={this.handleActive}
                />
              );
            })}
          </Col>
          <Col
            xs={7}
            sm={8}
            md={6}
            className={styles.value_padding_description_container}
          >
            <div className={styles.value_description_container}>
              <h5 className={styles.value_description_heading}>
                {this.state.currentActive.valueName}
              </h5>
              <p className={styles.value_description}>
                {this.state.currentActive.valueDesc}
              </p>
              <Button
                className={styles.value_button}
                href={this.state.currentActive.valueLink}
              >
                Know More
              </Button>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ValueComponent;
