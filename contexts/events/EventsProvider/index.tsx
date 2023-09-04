import calendarAPI from "@/api/index";
import {
  EventResponse,
  Event,
  EventPayload,
  EventsState,
} from "@/interfaces/events";
import { CREATED_STATUS, SUCCESS_STATUS } from "@/utils/index";
import { FC, ReactNode, useReducer } from "react";
import Types from "../types";

import { EventsContext, eventsReducer } from "..";

interface ProviderProps {
  children: ReactNode;
}

export const Events_INITIAL_STATE: EventsState = {
  newEvent: {
    isLoading: false,
    error: null,
    data: null,
  },
  deleteEvent: {
    isLoading: false,
    error: null,
    isDeleted: false,
  },
  updateEvent: {
    isLoading: false,
    error: null,
    data: null,
  },
  events: [],
  selectedEvent: null,
};

export const EventsProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, Events_INITIAL_STATE);

  const selectEvent = (event: Event | null) => {
    dispatch({ type: Types.SELECT_EVENT, payload: event });
  };

  const createEvent = async (event: Event) => {
    dispatch({ type: Types.CREATE_EVENT });
    try {
      const { status, data } = await calendarAPI.post<EventResponse>(
        "/events",
        event
      );
      if (status === CREATED_STATUS) {
        return dispatch({
          type: Types.CREATE_EVENT_SUCCESS,
          payload: data.data.event,
        });
      }
      dispatch({
        type: Types.CREATE_EVENT_ERROR,
        payload: "Error when trying to create event",
      });
    } catch (error: any) {
      dispatch({
        type: Types.CREATE_EVENT_ERROR,
        payload: error.response.data.errors[0].message,
      });
    }
  };

  const deleteEvent = async (eventId: string) => {
    dispatch({ type: Types.DELETE_EVENT });
    try {
      const { status } = await calendarAPI.delete(`/events/${eventId}`);

      if (status === 204) {
        return dispatch({
          type: Types.DELETE_EVENT_SUCCESS,
          payload: true,
        });
      }
      dispatch({
        type: Types.DELETE_EVENT_ERROR,
        payload: "Error when trying to delete event",
      });
    } catch (error: any) {
      dispatch({
        type: Types.DELETE_EVENT_ERROR,
        payload: error.response.data.errors[0].message,
      });
    }
  };

  const updateEvent = async (event: Event) => {
    dispatch({ type: Types.UPDATE_EVENT });
    try {
      const { status, data } = await calendarAPI.patch<EventResponse>(
        `/events/${event.id}`,
        event
      );
      if (status === SUCCESS_STATUS) {
        return dispatch({
          type: Types.UPDATE_EVENT_SUCCESS,
          payload: data.data.event,
        });
      }
      dispatch({
        type: Types.UPDATE_EVENT_ERROR,
        payload: "Error when trying to update event",
      });
    } catch (error: any) {
      dispatch({
        type: Types.UPDATE_EVENT_ERROR,
        payload: error.response.data.errors[0].message,
      });
    }
  };

  const setEvents = (events: EventPayload[]) => {
    dispatch({ type: Types.SET_EVENTS, payload: events });
  };

  const resetNewEvent = () => {
    dispatch({ type: Types.RESET_NEW_EVENT });
  };

  const resetDeletedEvent = () => {
    dispatch({ type: Types.RESET_DELETED_EVENT });
  };

  const resetUpdatedEvent = () => {
    dispatch({ type: Types.RESET_UPDATED_EVENT });
  };

  const removeEventFromState = (eventId: string) => {
    dispatch({ type: Types.REMOVE_EVENT_FROM_STATE, payload: eventId });
  };

  return (
    <EventsContext.Provider
      value={{
        eventsState: state,
        // Methods
        selectEvent,
        createEvent,
        deleteEvent,
        updateEvent,
        resetNewEvent,
        setEvents,
        resetDeletedEvent,
        resetUpdatedEvent,
        removeEventFromState,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
