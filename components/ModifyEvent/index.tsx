import { EventsContext } from "@/contexts/index";
import { ModifyEvent } from "@/interfaces/index";
import { customMuiStyles, TIMEOUT_TIME } from "@/utils/index";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  GlobalStyles,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AlarmSelect from "../AlarmSelect";
import RepeatEventSelect from "../RepeatEventSelect";
import styles from "./styles.module.scss";
import DeleteEventModal from "../DeleteEvent";
import UpdateEventModal from "../UpdateEvent";
import ModifyEventMessages from "../ModifyEventMessages";

type FormData = {
  name: string;
  dateAndTime: string;
};

const ModifyEventForm: React.FC<ModifyEvent> = ({
  date,
  name,
  alarm,
  repeat,
}) => {
  const { query } = useRouter();
  const [updatedDate, setUpdatedDate] = React.useState<Dayjs | null>(
    dayjs(date)
  );
  const [updatedAlarm, setUpdatedAlarm] = React.useState<string>(
    alarm || "at-the-time-of-the-event"
  );
  const [updatedRepeatValue, setUpdatedRepeatedValue] = React.useState<string>(
    repeat || "never"
  );
  const [updatedName, setUpdatedName] = React.useState<string>(name);
  const [areButtonsDisabled, setAreButtonsDisabled] =
    React.useState<boolean>(false);
  const [deleteModalIsVisible, setDeleteModalIsVisible] =
    React.useState<boolean>(false);
  const [updateModalIsVisible, setUpdateModalIsVisible] =
    React.useState<boolean>(false);
  const {
    register,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const {
    updateEvent,
    deleteEvent,
    resetDeletedEvent,
    eventsState,
    selectEvent,
    resetUpdatedEvent,
    removeEventFromState,
  } = useContext(EventsContext);

  const handleDateChange = (newValue: Dayjs | null) => {
    setUpdatedDate(newValue);
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUpdatedName(e.target.value);
  };

  const onUpdateEvent = async () => {
    updateEvent({
      id: eventsState.selectedEvent?.id,
      name: updatedName,
      date: dayjs(updatedDate).toISOString(),
      alarm: updatedAlarm,
      repeat: updatedRepeatValue,
    });
  };

  const onDeleteHandler = () => {
    if (!eventsState.selectedEvent) return;

    deleteEvent(eventsState.selectedEvent.id as string);
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

  const goBackHandler = () => {
    selectEvent(null);
  };

  useEffect(() => {
    if (eventsState.deleteEvent.isDeleted) {
      setDeleteModalIsVisible(false);
      setAreButtonsDisabled(true);
      setTimeout(() => {
        setAreButtonsDisabled(false);
        selectEvent(null);
        resetDeletedEvent();
      }, TIMEOUT_TIME);
      return;
    }

    if (eventsState.deleteEvent.error) {
      setDeleteModalIsVisible(false);
      setTimeout(() => {
        resetDeletedEvent();
      }, TIMEOUT_TIME);
    }
  }, [eventsState.deleteEvent]);

  useEffect(() => {
    if (eventsState.updateEvent.data) {
      setUpdateModalIsVisible(false);

      setUpdatedName(eventsState.updateEvent.data.name);
      setUpdatedDate(dayjs(eventsState.updateEvent.data.date));
      setUpdatedAlarm(eventsState.updateEvent.data.alarm);
      setUpdatedRepeatedValue(eventsState.updateEvent.data.repeat);

      const updatedDateYear = dayjs(eventsState.updateEvent.data.date).year();
      const updatedDateMonth = dayjs(eventsState.updateEvent.data.date).month();
      const updatedDateDay = dayjs(eventsState.updateEvent.data.date).date();

      const queryDate = query.date as string;
      const [day, month, year] = queryDate.split("-");

      const currentDate = dayjs(
        new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      ).toISOString();

      const updatedEventDate = dayjs(
        new Date(updatedDateYear, updatedDateMonth, updatedDateDay)
      ).toISOString();

      if (currentDate !== updatedEventDate) {
        removeEventFromState(eventsState.updateEvent.data.id);
      }

      setTimeout(() => {
        resetUpdatedEvent();
      }, TIMEOUT_TIME);
    }

    if (eventsState.updateEvent.error) {
      setUpdateModalIsVisible(false);
      setTimeout(() => {
        resetUpdatedEvent();
      }, TIMEOUT_TIME);
    }
  }, [eventsState.updateEvent]);

  return (
    <div className={styles.modifyEventForm}>
      <GlobalStyles styles={customMuiStyles} />
      <Modal
        open={deleteModalIsVisible}
        onClose={() => setDeleteModalIsVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteEventModal
          isLoading={eventsState.deleteEvent.isLoading}
          isDeleted={eventsState.deleteEvent.isDeleted}
          error={eventsState.deleteEvent.error}
          onDeleteHandler={onDeleteHandler}
          onClose={() => setDeleteModalIsVisible(false)}
        />
      </Modal>
      <Modal
        open={updateModalIsVisible}
        onClose={() => setUpdateModalIsVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateEventModal
          isLoading={eventsState.updateEvent.isLoading}
          isUpdated={!!eventsState.updateEvent.data}
          error={eventsState.updateEvent.error}
          onClose={() => setUpdateModalIsVisible(false)}
          onUpdateHandler={onUpdateEvent}
        />
      </Modal>
      <ModifyEventMessages
        error={eventsState.deleteEvent.error}
        isLoading={eventsState.deleteEvent.isLoading}
        isModified={eventsState.deleteEvent.isDeleted}
        successMessage="Event deleted successfully"
      />
      <ModifyEventMessages
        error={eventsState.updateEvent.error}
        isLoading={eventsState.updateEvent.isLoading}
        isModified={!!eventsState.updateEvent.data}
        successMessage="Event updated successfully"
      />
      <form
        className={styles.modifyEventForm__form}
        onSubmit={handleSubmit(onUpdateEvent)}
        role="create-event-form"
      >
        <div className={styles.modifyEventForm__formTop}>
          <Typography fontSize={25} color="#07213a" fontWeight={400}>
            Manage Event
          </Typography>
        </div>

        <div className={styles.modifyEventForm__formContent}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            {...register("name", {
              required: "The name is required",
              onBlur: onNameBlur,
              onChange: handleNameChange,
              validate: (name) => {
                return !!name.trim();
              },
            })}
            error={!!errors.name}
            variant="standard"
            value={updatedName}
          />
          <div
            className={`${styles.modifyEventForm__select} ${styles.modifyEventForm__repeat}`}
          >
            <RepeatEventSelect
              repeat={updatedRepeatValue}
              setRepeatPeriod={(period) => setUpdatedRepeatedValue(period)}
            />
          </div>
          <div className={styles.modifyEventForm__select}>
            <AlarmSelect
              alarm={updatedAlarm}
              setAlarm={(alarm) => setUpdatedAlarm(alarm)}
            />
          </div>
          <DateTimePicker
            label="Date and time"
            value={updatedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={areButtonsDisabled}
            onClick={() => setUpdateModalIsVisible(true)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            disabled={areButtonsDisabled}
            onClick={() => setDeleteModalIsVisible(true)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            fullWidth
            disabled={areButtonsDisabled}
            onClick={goBackHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModifyEventForm;
