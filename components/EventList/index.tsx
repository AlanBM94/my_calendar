import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { EventListItem } from '../EventListItem';
import styles from './styles.module.scss';

export const EventList: React.FC = () => {
  const { query } = useRouter();

  const queryDate = query.date as string;

  console.log('this is the router', queryDate.split('-'));
  // año mes y dia

  const [day, month, year] = queryDate.split('-');

  const currentDate = dayjs(
    new Date(parseInt(year), parseInt(month) - 1, parseInt(day)),
  );

  console.log('this is the router', currentDate);

  return (
    <div className={styles.eventList}>
      <div className={styles.eventList__title}>
        <Typography fontSize={25} color="#07213a" fontWeight={400}>
          {currentDate.format('DD MMMM YYYY')}
        </Typography>
      </div>
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
    </div>
  );
};
