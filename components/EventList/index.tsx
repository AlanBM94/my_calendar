import { Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { EventListItem } from "../EventListItem";
import styles from "./styles.module.scss";
import { EventsContext } from "@/contexts/events";

export const EventList: React.FC = () => {
  const { query } = useRouter();
  const { eventsState } = useContext(EventsContext);
  const [eventDate, setEventDate] = React.useState<null | Dayjs>(null);

  useEffect(() => {
    if (!query.date) return;
    const queryDate = query.date as string;
    const [day, month, year] = queryDate.split("-");
    const currentDate = dayjs(
      new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    );
    setEventDate(currentDate);
  }, [query]);

  if (!eventDate) return <></>;

  return (
    <div className={styles.eventList}>
      <div className={styles.eventList__title}>
        <Typography fontSize={25} color="#07213a" fontWeight={400}>
          {eventDate.format("DD MMMM YYYY")}
        </Typography>
      </div>
      {eventsState.events.length === 0 && (
        <div className={styles.eventList__empty}>
          <Typography fontSize={20} color="#07213a" fontWeight={400}>
            There are no events for this day
          </Typography>
        </div>
      )}
      {eventsState.events.map((event) => (
        <EventListItem
          key={event.id}
          id={event.id}
          repeat={event.repeat}
          name={event.name}
          date={event.date}
          alarm={event.alarm}
        />
      ))}
    </div>
  );
};
