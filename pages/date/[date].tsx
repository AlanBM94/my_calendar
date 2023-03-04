import { NewEventProps } from '@/interfaces/index';
import { EventList, Layout } from '@/components/index';
import React from 'react';
import { useRouter } from 'next/router';

const DatePage: React.FC<NewEventProps> = ({}) => {
  const router = useRouter();
  const { query } = router;

  return (
    <Layout title={`MyCalendar ${query.date}`}>
      <EventList />
    </Layout>
  );
};

export default DatePage;
