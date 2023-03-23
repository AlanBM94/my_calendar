import { NewEventProps } from "@/interfaces/index";
import { ArrowBack, Check } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import {
  Fab,
  TextField,
  Typography,
  GlobalStyles,
  Select,
  InputLabel,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { customMuiStyles } from "@/utils/index";
import styles from "./styles.module.scss";
import React, { useEffect, useContext } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { EventsContext } from "@/contexts/index";

type FormData = {
  name: string;
  dateAndTime: string;
};

//TODO: make tests for this component
const NewEventForm: React.FC<NewEventProps> = ({ isVisible, setNewEvent }) => {
  const [dateAndTime, setDateAndTime] = React.useState<Dayjs | null>(dayjs());
  const [alarm, setAlarm] = React.useState<string>("at-the-time-of-the-event");
  const [repeat, setRepeat] = React.useState<string>("never");
  const [name, setName] = React.useState<string>("");
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);
  const {
    register,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const { createEvent, resetNewEvent, state } = useContext(EventsContext);
  const { isLoading, error, data } = state.newEvent;

  const handleChange = (newValue: Dayjs | null) => {
    setDateAndTime(newValue);
  };

  const handleName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const resetName = () => {
    setName("");
    resetField("name");
  };

  const onCreateEvent = async () => {
    if (!dateAndTime) return;

    createEvent({
      name,
      date: dayjs(dateAndTime).toISOString(),
      alarm,
      repeat,
    });
  };

  const onNameBlur = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.trim() === "") {
      return setError("name", {
        message: "The name is required",
      });
    }
    clearErrors("name");
  };

  const resetNewEventHandler = () => {
    resetNewEvent();
    setDisableSubmit(false);
  };

  useEffect(() => {
    if (isVisible) {
      resetNewEventHandler();
    }
  }, [isVisible]);

  useEffect(() => {
    if (data) {
      setDisableSubmit(true);
      resetName();
      setTimeout(() => {
        resetNewEventHandler();
      }, 3000);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      resetName();
      setTimeout(() => {
        resetNewEventHandler();
      }, 3000);
    }
  }, [error]);

  return (
    <div className={styles.newEventForm}>
      <GlobalStyles styles={customMuiStyles} />
      {data && (
        <Alert
          severity="success"
          style={{
            marginBottom: "10px",
          }}
        >{`Event ${data.name} created`}</Alert>
      )}
      {error && (
        <Alert
          severity="error"
          style={{
            marginBottom: "10px",
          }}
        >
          {error}
        </Alert>
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form
          className={styles.newEventForm__form}
          onSubmit={handleSubmit(onCreateEvent)}
          role="create-event-form"
        >
          <div className={styles.newEventForm__formTop}>
            <Fab
              color="default"
              aria-label="go-back"
              role="go-back-button"
              disabled={disableSubmit}
              onClick={() => setNewEvent()}
            >
              <ArrowBack />
            </Fab>
            <Typography fontSize={25} color="#07213a" fontWeight={400}>
              New event
            </Typography>
            <Fab
              color="primary"
              type="submit"
              aria-label="add"
              role="create-event-button"
              disabled={disableSubmit}
            >
              <Check />
            </Fab>
          </div>

          <div className={styles.newEventForm__formContent}>
            <TextField
              id="name"
              label="Name"
              fullWidth
              {...register("name", {
                required: "The name is required",
                onBlur: onNameBlur,
                onChange: handleName,
                validate: (name) => {
                  return !!name.trim();
                },
              })}
              error={!!errors.name}
              variant="standard"
              value={name}
            />
            <div
              className={`${styles.newEventForm__select} ${styles.newEventForm__repeat}`}
            >
              <InputLabel htmlFor="alarm">Repeat</InputLabel>
              <Select
                native
                onChange={(e) => {
                  setRepeat(e.target.value);
                }}
                value={alarm}
                inputProps={{
                  name: "repeat",
                  id: "repeat",
                }}
              >
                <option value="never">Never</option>
                <option value="every-day">Every day</option>
                <option value="every-week">Every week</option>
                <option value="every-2-weeks">Every 2 weeks</option>
                <option value="every-month">Every month</option>
                <option value="every-year">Every year</option>
              </Select>
            </div>
            <div className={styles.newEventForm__select}>
              <InputLabel htmlFor="alarm">Alarm</InputLabel>
              <Select
                native
                onChange={(e) => {
                  console.log("this is the e", e.target.value);
                  setAlarm(e.target.value);
                }}
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
                <option value="1-hour-before-the-event">
                  1 hour before the event
                </option>
                <option value="2-hour-before-the-event">
                  2 hours before the event
                </option>
                <option value="1-day-before-the-event">
                  1 day before the event
                </option>
                <option value="2-day-before-the-event">
                  2 days before the event
                </option>
                <option value="1-week-before-the-event">
                  1 week before the event
                </option>
                <option value="2-week-before-the-event">
                  2 weeks before the event
                </option>
              </Select>
            </div>

            <DateTimePicker
              label="Date and time"
              value={dateAndTime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default NewEventForm;
