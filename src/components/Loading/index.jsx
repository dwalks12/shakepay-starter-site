import React from 'react';
import LoadingSmall from './LoadingSmall';
import styles from './Loading.module.scss';

const Loading = () => (
  <div className={styles.loadingContainer}>
    <LoadingSmall color="black" />
  </div>
)

export default Loading;