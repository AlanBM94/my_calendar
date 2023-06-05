import React from "react";
import { Select, SelectChangeEvent, InputLabel } from "@mui/material";

interface RepeatEventSelectProps {
  repeat: string;
  setRepeatPeriod: (period: string) => void;
}

const RepeatEventSelect: React.FC<RepeatEventSelectProps> = ({
  repeat,
  setRepeatPeriod,
}) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    setRepeatPeriod(e.target.value);
  };

  return (
    <>
      <InputLabel htmlFor="repeat">Repeat</InputLabel>
      <Select
        native
        onChange={handleChange}
        value={repeat}
        inputProps={{
          name: "repeat",
          id: "repeat",
        }}
        data-testid="repeat-select" // add this line
      >
        <option value="never">Never</option>
        <option value="every-day">Every day</option>
        <option value="every-week">Every week</option>
        <option value="every-2-weeks">Every 2 weeks</option>
        <option value="every-month">Every month</option>
        <option value="every-year">Every year</option>
      </Select>
    </>
  );
};

export default RepeatEventSelect;
