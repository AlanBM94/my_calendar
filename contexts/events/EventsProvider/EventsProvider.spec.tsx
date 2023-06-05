import calendarAPI from "@/api/index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";
import { EventsProvider, Events_INITIAL_STATE } from "./";
import React from "react";
import Types from "../types";

// you should be testing the side effects of calling createEvent, which are:

// The API function (calendarAPI.post) gets called.
// The API function gets called with the right arguments.
// Here's how you can modify the test to reflect this:

// Mock axios
jest.mock("@/api/index");

const TestComponent = () => {
  const {
    createEvent,
    deleteEvent,
    updateEvent,
    selectEvent,
    setEvents,
    resetNewEvent,
    resetDeletedEvent,
    resetUpdatedEvent,
    removeEventFromState,
  } = useContext(EventsContext);

  return (
    <>
      <button
        onClick={() =>
          setEvents([
            {
              name: "Estudiar React",
              date: "2023-05-28T14:47:52.687Z",
              alarm: "at-the-time-of-the-event",
              repeat: "never",
              createdAt: "2023-05-28T14:48:08.645Z",
              __v: 0,
              id: "647369a88537e097ed056ab9",
            },
          ])
        }
      >
        Set events
      </button>
      <button
        onClick={() =>
          selectEvent({
            name: "Estudiar React",
            date: "2023-05-28T14:47:52.687Z",
            alarm: "at-the-time-of-the-event",
            repeat: "never",
          })
        }
      >
        Select event
      </button>
      <button
        onClick={() =>
          createEvent({
            name: "Estudiar React",
            date: "2023-05-28T14:47:52.687Z",
            alarm: "at-the-time-of-the-event",
            repeat: "never",
          })
        }
      >
        Create event
      </button>
      <button onClick={() => deleteEvent("1")}>Delete event</button>
      <button
        onClick={() =>
          updateEvent({
            name: "Estudiar React",
            date: "2023-05-28T14:47:52.687Z",
            alarm: "at-the-time-of-the-event",
            repeat: "never",
            id: "647369a88537e097ed056ab9",
          })
        }
      >
        Update event
      </button>
      <button onClick={resetNewEvent}>Reset new event</button>
      <button onClick={resetDeletedEvent}>Reset deleted event</button>
      <button onClick={resetUpdatedEvent}>Reset updated event</button>
      <button onClick={() => removeEventFromState("1")}>
        Remove event from state
      </button>
    </>
  );
};

describe("Provider functions", () => {
  it("should work selectEvent correctly", () => {
    const mockEvent = {
      name: "Estudiar React",
      date: "2023-05-28T14:47:52.687Z",
      alarm: "at-the-time-of-the-event",
      repeat: "never",
    };

    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Select event"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.SELECT_EVENT,
      payload: mockEvent,
    });
  });

  it("should work setEvents correctly", () => {
    const mockEvent = [
      {
        name: "Estudiar React",
        date: "2023-05-28T14:47:52.687Z",
        alarm: "at-the-time-of-the-event",
        repeat: "never",
        createdAt: "2023-05-28T14:48:08.645Z",
        __v: 0,
        id: "647369a88537e097ed056ab9",
      },
    ];

    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Set events"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.SET_EVENTS,
      payload: mockEvent,
    });
  });

  it("should work resetNewEvent correctly", () => {
    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Reset new event"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.RESET_NEW_EVENT,
    });
  });

  it("should work resetDeletedEvent correctly", () => {
    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Reset deleted event"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.RESET_DELETED_EVENT,
    });
  });

  it("should work resetUpdatedEvent correctly", () => {
    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Reset updated event"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.RESET_UPDATED_EVENT,
    });
  });

  it("should work removeEventFromState correctly", () => {
    const mockDispatch = jest.fn();

    jest
      .spyOn(React, "useReducer")
      .mockReturnValue([Events_INITIAL_STATE, mockDispatch]);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Remove event from state"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Types.REMOVE_EVENT_FROM_STATE,
      payload: "1",
    });
  });

  it("should work createEvent correctly", async () => {
    const mockPost = calendarAPI.post as jest.MockedFunction<
      typeof calendarAPI.post
    >;

    // Define what the mock should return when the API is called
    mockPost.mockResolvedValueOnce({
      status: 201,
      data: {
        data: {
          event: {
            name: "Estudiar React",
            date: "2023-05-28T14:47:52.687Z",
            alarm: "at-the-time-of-the-event",
            repeat: "never",
            createdAt: "2023-05-28T14:48:08.645Z",
            __v: 0,
            id: "647369a88537e097ed056ab9",
          },
        },
      },
    });

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Create event"));

    //   Wait for the API call to resolve and check that it has been called
    await waitFor(() => expect(calendarAPI.post).toHaveBeenCalledTimes(1));

    //   Check that the API function was called with the correct arguments
    expect(calendarAPI.post).toHaveBeenCalledWith("/events", {
      name: "Estudiar React",
      date: "2023-05-28T14:47:52.687Z",
      alarm: "at-the-time-of-the-event",
      repeat: "never",
    });
  });

  it("should work deleteEvent correctly", async () => {
    const mockDelete = calendarAPI.delete as jest.MockedFunction<
      typeof calendarAPI.delete
    >;

    // Define what the mock should return when the API is called
    mockDelete.mockResolvedValueOnce({
      status: 204,
    });
    //   Set up your API mock

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Delete event"));

    //   Wait for the API call to resolve and check that it has been called
    await waitFor(() => expect(calendarAPI.delete).toHaveBeenCalledTimes(1));

    //   Check that the API function was called with the correct arguments
    expect(calendarAPI.delete).toHaveBeenCalledWith("/events/1");
  });

  it("should work updateEvent correctly", async () => {
    const mockUpdate = calendarAPI.patch as jest.MockedFunction<
      typeof calendarAPI.patch
    >;

    // Define what the mock should return when the API is called
    mockUpdate.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          event: {
            name: "Estudiar React",
            date: "2023-05-28T14:47:52.687Z",
            alarm: "at-the-time-of-the-event",
            repeat: "never",
            createdAt: "2023-05-28T14:48:08.645Z",
            __v: 0,
            id: "647369a88537e097ed056ab9",
          },
        },
      },
    });
    //   Set up your API mock

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    fireEvent.click(screen.getByText("Update event"));

    //   Wait for the API call to resolve and check that it has been called
    await waitFor(() => expect(calendarAPI.patch).toHaveBeenCalledTimes(1));

    //   Check that the API function was called with the correct arguments
    expect(calendarAPI.patch).toHaveBeenCalledWith(
      "/events/647369a88537e097ed056ab9",
      {
        name: "Estudiar React",
        date: "2023-05-28T14:47:52.687Z",
        alarm: "at-the-time-of-the-event",
        repeat: "never",
        id: "647369a88537e097ed056ab9",
      }
    );
  });
});

// In this modified test, we're checking that calendarAPI.post (which we're mocking as mockedAxios.post) is called once, and that it's called with the correct arguments.

// This still doesn't test that the dispatch calls inside createEvent are doing the right thing. To do that, you'd need to check the resulting context state after createEvent is called. However, this is more related to how the reducer works and might be better covered in a test for the reducer itself.
