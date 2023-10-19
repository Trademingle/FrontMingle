import React from 'react';
import styles from './styles.module.css';

function Tags(props) {
    if (!props.tagname) return null;
    return (
        // <box className={styles.tag}>
            <p className={styles.tagfont}>{props.tagname}</p>
        // </box>
    )
};
export default Tags;