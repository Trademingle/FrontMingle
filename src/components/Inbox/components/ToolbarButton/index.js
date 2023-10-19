import React from 'react';
import styles from './toolbarButton.module.css';

export default function ToolbarButton(props) {
    const { icon } = props;
    return (
      <i className={`${styles.toolbar_button} ${icon}`} />
    );
}