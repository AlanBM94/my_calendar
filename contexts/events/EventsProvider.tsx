import { EventsState, Event, EventResponse } from "@/interfaces/events";
import { FC, ReactNode, useReducer } from "react";
import calendarAPI from "@/api/index";

import { EventsContext, eventsReducer } from "./";

interface ProviderProps {
  children: ReactNode;
}

const Events_INITIAL_STATE: EventsState = {
  newEvent: {
    isLoading: false,
    error: null,
    data: null,
  },
};

export const EventsProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, Events_INITIAL_STATE);

  const createEvent = async (event: Event) => {
    dispatch({ type: "CREATE_EVENT" });
    try {
      const { status, data } = await calendarAPI.post<EventResponse>(
        "/events",
        event
      );
      if (status === 201) {
        return dispatch({
          type: "CREATE_EVENT_SUCCESS",
          payload: data.data.event,
        });
      }
      dispatch({
        type: "CREATE_EVENT_ERROR",
        payload: "Error when trying to create event",
      });
    } catch (error: any) {
      dispatch({
        type: "CREATE_EVENT_ERROR",
        payload: error.response.data.errors[0].message,
      });
    }
  };

  const resetNewEvent = () => {
    dispatch({ type: "RESET_NEW_EVENT" });
  };

  return (
    <EventsContext.Provider
      value={{
        state,
        // Methods
        createEvent,
        resetNewEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
