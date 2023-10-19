import React from "react";
import { Col } from "react-bootstrap";
import styles from '../About.module.css'

class ValueTab extends React.Component {
  render() {
    let className=styles.value_tab;
    if (this.props.active.valueName == this.props.value.valueName) {
      // className += " active";
      let className=styles.value_tab.active;
    }
    return (
      <Col
        xs={12}
        onClick={() => this.props.onActive(this.props.value)}
        className={className}
      >
        <h6>{this.props.value.valueName}</h6>
      </Col>
    );
  }
}

export default ValueTab;
