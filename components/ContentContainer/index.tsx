import { Calendar } from "@/components/index";
import React, { useEffect } from "react";
import NewEventForm from "../NewEventForm";
import styles from "./styles.module.scss";

export const ContentContainer: React.FC = () => {
  const [slideToLeftClass, setSlideToLeftClassDate] =
    React.useState<string>("");
  const [newEventContainerClass, setNewEventContainerClass] =
    React.useState<string>("");
  const [newEvent, setNewEvent] = React.useState<boolean>(false);

  useEffect(() => {
    if (newEvent) {
      setNewEventContainerClass(styles.newEventContainer);
      return setSlideToLeftClassDate(styles.slideToLeft);
    }

    setNewEventContainerClass("");
    setSlideToLeftClassDate("");
  }, [newEvent]);

  return (
    <>
      <div
        className={`${styles.contentContainer__calendar} ${slideToLeftClass} ${newEventContainerClass}`}
      >
        <Calendar setNewEvent={() => setNewEvent(true)} />
      </div>
      <div
        className={`${styles.contentContainer__newEvent} ${slideToLeftClass}`}
      >
        <NewEventForm
          isVisible={newEvent}
          setNewEvent={() => setNewEvent(false)}
        />
      </div>
    </>
  );
};
