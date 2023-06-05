import { NewEventProps } from "@/interfaces/index";
import AddIcon from "@mui/icons-material/Add";
import { Fab, GlobalStyles, TextField } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { customMuiStyles } from "@/utils/index";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers";

export const Calendar: React.FC<NewEventProps> = ({ setNewEvent }) => {
  const [date, setDate] = React.useState<Dayjs>(dayjs());
  const [userClickedDay, setUserClickedDay] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (userClickedDay) {
      const currentMonth = date.month() + 1;
      const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
      router.push(`/date/${date.date()}-${month}-${date.year()}`);
    }
  }, [date]);

  return (
    <>
      <GlobalStyles styles={customMuiStyles} />
      <div className={styles.calendar__containerButton}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setNewEvent()}
          role="add-event"
        >
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.calendar__containerPicker} role="calendar">
        <DatePicker
          className={styles.calendar__picker}
          label="date"
          value={date}
          onChange={(newDate) => {
            if (newDate) {
              setUserClickedDay(true);
              setDate(newDate);
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </>
  );
};

export default Calendar;
