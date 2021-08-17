import React from 'react';
import styles from './LoadingSmall.module.scss';

const LoadingSmall = ({
  color = '#ffffff',
}) => (
  <div className={styles.loader} style={{ color: color }} />
);

export default LoadingSmall;