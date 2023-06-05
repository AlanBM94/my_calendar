import { eventsReducer, EventsActionType } from "./";
import Types from "../types";

describe("eventsReducer", () => {
  const initialState = {
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

  const mockedEvent = {
    name: "Estudiar React",
    date: "2023-05-30T02:35:21.474Z",
    alarm: "at-the-time-of-the-event",
    repeat: "never",
    createdAt: "2023-05-30T02:35:26.965Z",
    __v: 0,
    id: "647560ee927a680eeb7ba721",
  };

  it("should handle CREATE_EVENT action", () => {
    const action = { type: Types.CREATE_EVENT } as EventsActionType;
    const expectedState = {
      ...initialState,
      newEvent: { ...initialState.newEvent, isLoading: true },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CREATE_EVENT_ERROR action", () => {
    const action = {
      type: Types.CREATE_EVENT_ERROR,
      payload: "An error occurred",
    } as EventsActionType;
    const expectedState = {
      ...initialState,
      newEvent: { isLoading: false, error: "An error occurred", data: null },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CREATE_EVENT_SUCCESS action", () => {
    const payload = mockedEvent;

    const action = {
      type: Types.CREATE_EVENT_SUCCESS,
      payload,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      newEvent: { isLoading: false, error: null, data: payload },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });
  it("should handle DELETE_EVENT action", () => {
    const action = { type: Types.DELETE_EVENT } as EventsActionType;
    const expectedState = {
      ...initialState,
      deleteEvent: { ...initialState.deleteEvent, isLoading: true },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_EVENT_ERROR action", () => {
    const action = {
      type: Types.DELETE_EVENT_ERROR,
      payload: "An error occurred",
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      deleteEvent: {
        isLoading: false,
        error: "An error occurred",
        isDeleted: false,
      },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_EVENT_SUCCESS action", () => {
    const payload = true;

    const action = {
      type: Types.DELETE_EVENT_SUCCESS,
      payload,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      deleteEvent: { isLoading: false, error: null, isDeleted: payload },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_EVENT action", () => {
    const action = { type: Types.UPDATE_EVENT } as EventsActionType;
    const expectedState = {
      ...initialState,
      updateEvent: { ...initialState.updateEvent, isLoading: true },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_EVENT_ERROR action", () => {
    const action = {
      type: Types.UPDATE_EVENT_ERROR,
      payload: "An error occurred",
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      updateEvent: {
        isLoading: false,
        error: "An error occurred",
        data: null,
      },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_EVENT_SUCCESS action", () => {
    const payload = mockedEvent;

    const action = {
      type: Types.UPDATE_EVENT_SUCCESS,
      payload,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      updateEvent: { isLoading: false, error: null, data: payload },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_NEW_EVENT action", () => {
    const action = {
      type: Types.RESET_NEW_EVENT,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      newEvent: { isLoading: false, error: null, data: null },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SELECT_EVENT action", () => {
    const action = {
      type: Types.SELECT_EVENT,
      payload: mockedEvent,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      selectedEvent: mockedEvent,
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_EVENTS action", () => {
    const mockedEvents = [mockedEvent];
    const action = {
      type: Types.SET_EVENTS,
      payload: mockedEvents,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      events: mockedEvents,
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_DELETED_EVENT action", () => {
    const action = {
      type: Types.RESET_DELETED_EVENT,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      deleteEvent: {
        error: null,
        isDeleted: false,
        isLoading: false,
      },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_UPDATED_EVENT action", () => {
    const action = {
      type: Types.RESET_UPDATED_EVENT,
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      updateEvent: {
        error: null,
        isLoading: false,
        data: null,
      },
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_EVENT_FROM_STATE action", () => {
    // set events to state
    const mockedEvents = [mockedEvent];
    const setEventsAction = {
      type: Types.SET_EVENTS,
      payload: mockedEvents,
    } as EventsActionType;

    const stateWithEvents = eventsReducer(initialState, setEventsAction);

    const expectedStateWithEvent = {
      ...initialState,
      events: mockedEvents,
    };

    expect(stateWithEvents).toEqual(expectedStateWithEvent);

    // remove event from state
    const action = {
      type: Types.REMOVE_EVENT_FROM_STATE,
      payload: "647560ee927a680eeb7ba721",
    } as EventsActionType;

    const expectedState = {
      ...initialState,
      events: [],
    };

    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle default action", () => {
    const expectedState = {
      ...initialState,
    };

    expect(eventsReducer(initialState, {} as EventsActionType)).toEqual(
      expectedState
    );
  });
});
