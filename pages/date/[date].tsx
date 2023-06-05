import {
  GetEventsResponse,
  EventPayload,
  EventsListProps,
} from "@/interfaces/index";
import dayjs, { Dayjs } from "dayjs";
import { EventList, Layout } from "@/components/index";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import calendarAPI from "@/api/index";
import { EventsContext } from "@/contexts/events";
import ModifyEvent from "@/components/ModifyEvent";

const DatePage: React.FC<EventsListProps> = ({ events }) => {
  const router = useRouter();
  const { query } = router;
  const { selectEvent, eventsState, setEvents } = useContext(EventsContext);

  useEffect(() => {
    selectEvent(null);
  }, []);

  useEffect(() => {
    if (!events) return;
    setEvents(events);
  }, [events]);

  return (
    <Layout title={`MyCalendar ${query.date}`}>
      {eventsState.selectedEvent && (
        <ModifyEvent
          name={eventsState.selectedEvent.name}
          alarm={eventsState.selectedEvent.alarm}
          date={eventsState.selectedEvent.date}
          repeat={eventsState.selectedEvent.repeat}
        />
      )}
      {!eventsState.selectedEvent && <EventList />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { date = "" } = params as { date: string };
  const [day, month, year] = date.split("-");
  const formatedDate = dayjs(
    new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  ).format("MM-DD-YYYY");
  let events: EventPayload[] = [];

  try {
    const { status, data } = await calendarAPI.get<GetEventsResponse>(
      `/events?date=${formatedDate}`
    );

    if (status === 200) {
      events = data.data.events;
    }
  } catch (error) {
    console.error("get events error", error);
    events = [];
  }

  return {
    props: {
      events,
    },
  };
};

export default DatePage;
