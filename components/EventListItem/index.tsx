import { Typography } from "@mui/material";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { EventPayload } from "@/interfaces/index";
import dayjs from "dayjs";
import { EventsContext } from "@/contexts/events";

interface EventListItemProps {
  alarm: string;
  name: string;
  date: string;
  repeat: string;
  id: string;
}

export const EventListItem: React.FC<EventListItemProps> = ({
  alarm,
  date,
  name,
  repeat,
  id,
}) => {
  const { selectEvent } = useContext(EventsContext);

  const selectEventHandler = () => {
    selectEvent({
      alarm,
      date,
      name,
      repeat,
      id,
    });
  };

  return (
    <div className={styles.eventListItem} onClick={selectEventHandler}>
      <div className={styles.eventListItem__border} />
      <Typography
        fontSize={15}
        fontWeight={500}
        className={styles.eventListItem__eventName}
      >
        {name}
      </Typography>
      <p className={styles.eventListItem__hour}>
        {dayjs(date).format("HH:mm")}
      </p>
    </div>
  );
};
