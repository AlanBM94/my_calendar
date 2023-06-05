import React from "react";
import { Select, SelectChangeEvent, InputLabel } from "@mui/material";

interface AlarmSelectProps {
  alarm: string;
  setAlarm: (alarm: string) => void;
}

const AlarmSelect: React.FC<AlarmSelectProps> = ({ alarm, setAlarm }) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    setAlarm(e.target.value);
  };

  return (
    <>
      <InputLabel htmlFor="alarm">Alarm</InputLabel>
      <Select
        native
        onChange={handleChange}
        value={alarm}
        inputProps={{
          name: "alarm",
          id: "alarm",
        }}
      >
        <option value="at-the-time-of-the-event">
          At the time of the event
        </option>
        <option value="5-minutes-before-the-event">
          5 minutes before the event
        </option>
        <option value="10-minutes-before-the-event">
          10 minutes before the event
        </option>
        <option value="15-minutes-before-the-event">
          15 minutes before the event
        </option>
        <option value="30-minutes-before-the-event">
          30 minutes before the event
        </option>
        <option value="1-hour-before-the-event">1 hour before the event</option>
        <option value="2-hour-before-the-event">
          2 hours before the event
        </option>
        <option value="1-day-before-the-event">1 day before the event</option>
        <option value="2-day-before-the-event">2 days before the event</option>
        <option value="1-week-before-the-event">1 week before the event</option>
        <option value="2-week-before-the-event">
          2 weeks before the event
        </option>
      </Select>
    </>
  );
};

export default AlarmSelect;
