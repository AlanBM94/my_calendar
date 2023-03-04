import { Typography } from '@mui/material';
import NextLink from 'next/link';
import Head from 'next/head';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import styles from './styles.module.scss';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ title = 'MyCalendar', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.layout} role="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <NextLink href="/" passHref style={{ textDecoration: 'none' }}>
              <Typography
                marginBottom={3}
                fontSize={30}
                fontWeight={700}
                color="#ffff"
              >
                my-calendar
              </Typography>
            </NextLink>
          </div>
          <div className={styles.layout__outercontainer}>{children}</div>
        </LocalizationProvider>
      </div>
    </>
  );
};
