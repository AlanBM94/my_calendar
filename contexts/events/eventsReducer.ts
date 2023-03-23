import { EventPayload, EventsState } from "@/interfaces/events";

type EventsActionType =
  | { type: "CREATE_EVENT" }
  | {
      type: "CREATE_EVENT_LOADING";
    }
  | {
      type: "CREATE_EVENT_ERROR";
      payload: string;
    }
  | {
      type: "CREATE_EVENT_SUCCESS";
      payload: EventPayload;
    }
  | { type: "RESET_NEW_EVENT" };

export const eventsReducer = (
  state: EventsState,
  action: EventsActionType
): EventsState => {
  switch (action.type) {
    case "CREATE_EVENT":
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          isLoading: true,
        },
      };
    case "CREATE_EVENT_ERROR": {
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      };
    }
    case "CREATE_EVENT_SUCCESS":
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: null,
          data: action.payload,
        },
      };

    case "RESET_NEW_EVENT":
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: null,
          data: null,
        },
      };
    default:
      return state;
  }
};
