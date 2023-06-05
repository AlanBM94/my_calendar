import { EventsContext } from "@/contexts/index";
import { NewEventProps } from "@/interfaces/index";
import { customMuiStyles } from "@/utils/index";
import { ArrowBack, Check } from "@mui/icons-material";
import {
  Alert,
  Box,
  CircularProgress,
  Fab,
  GlobalStyles,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AlarmSelect from "../AlarmSelect";
import RepeatEventSelect from "../RepeatEventSelect";
import styles from "./styles.module.scss";

type FormData = {
  name: string;
  dateAndTime: string;
};

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
  const { createEvent, resetNewEvent, eventsState } = useContext(EventsContext);
  const { isLoading, error, data } = eventsState.newEvent;

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
          role="loading-spinner"
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
              helperText={errors.name?.message}
              value={name}
            />
            <div
              className={`${styles.newEventForm__select} ${styles.newEventForm__repeat}`}
            >
              <RepeatEventSelect
                repeat={repeat}
                setRepeatPeriod={(period) => setRepeat(period)}
              />
            </div>
            <div className={styles.newEventForm__select}>
              <AlarmSelect
                alarm={alarm}
                setAlarm={(alarm) => setAlarm(alarm)}
              />
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
