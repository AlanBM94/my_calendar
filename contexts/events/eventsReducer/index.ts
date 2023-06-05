import { EventPayload, EventsState, Event } from "@/interfaces/events";
import Types from "../types";

export type EventsActionType =
  | { type: Types.CREATE_EVENT }
  | {
      type: Types.CREATE_EVENT_ERROR;
      payload: string;
    }
  | {
      type: Types.CREATE_EVENT_SUCCESS;
      payload: EventPayload;
    }
  | { type: Types.UPDATE_EVENT }
  | {
      type: Types.UPDATE_EVENT_ERROR;
      payload: string;
    }
  | {
      type: Types.UPDATE_EVENT_SUCCESS;
      payload: EventPayload;
    }
  | { type: Types.RESET_NEW_EVENT }
  | { type: Types.GET_EVENTS }
  | {
      type: Types.GET_EVENTS_ERROR;
      payload: string;
    }
  | { type: Types.GET_EVENTS_SUCCESS; payload: EventPayload[] }
  | { type: Types.DELETE_EVENT }
  | {
      type: Types.DELETE_EVENT_ERROR;
      payload: string;
    }
  | { type: Types.DELETE_EVENT_SUCCESS; payload: boolean }
  | { type: Types.SELECT_EVENT; payload: Event | null }
  | { type: Types.SET_EVENTS; payload: EventPayload[] }
  | { type: Types.RESET_DELETED_EVENT }
  | { type: Types.RESET_UPDATED_EVENT }
  | { type: Types.REMOVE_EVENT_FROM_STATE; payload: string };

export const eventsReducer = (
  state: EventsState,
  action: EventsActionType
): EventsState => {
  switch (action.type) {
    case Types.CREATE_EVENT:
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          isLoading: true,
        },
      };
    case Types.CREATE_EVENT_ERROR: {
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      };
    }
    case Types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: null,
          data: action.payload,
        },
      };

    case Types.DELETE_EVENT:
      return {
        ...state,
        deleteEvent: {
          error: null,
          isDeleted: false,
          isLoading: true,
        },
      };

    case Types.DELETE_EVENT_ERROR:
      return {
        ...state,
        deleteEvent: {
          error: action.payload,
          isDeleted: false,
          isLoading: false,
        },
      };

    case Types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.selectedEvent?.id
        ),
        deleteEvent: {
          error: null,
          isDeleted: action.payload,
          isLoading: false,
        },
      };

    case Types.UPDATE_EVENT:
      return {
        ...state,
        updateEvent: {
          isLoading: true,
          error: null,
          data: null,
        },
      };

    case Types.UPDATE_EVENT_ERROR:
      return {
        ...state,
        updateEvent: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      };

    case Types.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        updateEvent: {
          isLoading: false,
          error: null,
          data: action.payload,
        },
      };

    case Types.RESET_NEW_EVENT:
      return {
        ...state,
        newEvent: {
          isLoading: false,
          error: null,
          data: null,
        },
      };

    case Types.SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };

    case Types.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case Types.RESET_DELETED_EVENT:
      return {
        ...state,
        deleteEvent: {
          error: null,
          isDeleted: false,
          isLoading: false,
        },
      };

    case Types.RESET_UPDATED_EVENT:
      return {
        ...state,
        updateEvent: {
          isLoading: false,
          error: null,
          data: null,
        },
      };

    case Types.REMOVE_EVENT_FROM_STATE:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
};
