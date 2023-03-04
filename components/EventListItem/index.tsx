import { Typography } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';

export const EventListItem: React.FC = () => {
  return (
    <div className={styles.eventListItem}>
      <div className={styles.eventListItem__border} />
      <Typography
        fontSize={15}
        fontWeight={500}
        className={styles.eventListItem__eventName}
      >
        Examen de React
      </Typography>
      <p className={styles.eventListItem__hour}>12:00PM</p>
    </div>
  );
};
