import { ContextProps } from "@/interfaces/events";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { EventsContext } from "../../contexts";
import NewEventForm from "./index";

interface ProviderProps {
  children: ReactNode;
  eventContextState: ContextProps;
}

export const Provider: FC<ProviderProps> = ({
  children,
  eventContextState,
}) => {
  return (
    <EventsContext.Provider value={eventContextState}>
      {children}
    </EventsContext.Provider>
  );
};

const setNewEventMock = jest.fn();

export const props = {
  isVisible: false,
  setNewEvent: setNewEventMock,
};

const initialMockedState = {
  eventsState: {
    newEvent: {
      isLoading: false,
      error: null,
      data: null,
    },
  },
  createEvent: jest.fn(),
  resetNewEvent: jest.fn(),
};

describe("NewEventForm - renders and events", () => {
  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider eventContextState={initialMockedState}>
          <NewEventForm {...props} />
        </Provider>
      </LocalizationProvider>
    );
  });
  it("should render a new event title", () => {
    expect(screen.getByText(/new event/i)).toBeInTheDocument();
  });

  it("should render a go back button", () => {
    expect(screen.getByRole("go-back-button")).toBeInTheDocument();
  });

  it("should render a create button", () => {
    expect(screen.getByRole("create-event-button")).toBeInTheDocument();
  });

  it("should render an event name input", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("should render a date and time picker", () => {
    expect(screen.getByLabelText(/date and time/i)).toBeInTheDocument();
  });

  it("should call setNewEvent when go back button is clicked", () => {
    fireEvent.click(screen.getByRole("go-back-button"));

    expect(setNewEventMock).toBeCalled();
  });

  it("should show error when user submits form without name", async () => {
    expect(screen.getByText(/name/i)).not.toHaveClass("Mui-error");

    await act(() => {
      fireEvent.click(screen.getByRole("create-event-button"));
    });

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument();
  });

  it("should show error when user blur name without value", () => {
    expect(screen.getByText(/name/i)).not.toHaveClass("Mui-error");

    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "" },
    });

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument();
  });
});

describe("NewEventForm - renders and events based on context", () => {
  it("should clear name field when form is visible", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider eventContextState={initialMockedState}>
          <NewEventForm isVisible={true} setNewEvent={setNewEventMock} />
        </Provider>
      </LocalizationProvider>
    );
    expect(screen.getByLabelText(/name/i).textContent).toBe("");
  });

  it('should call "createEvent" when form is submitted', async () => {
    const createEventMock = jest.fn();
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider
          eventContextState={{
            ...initialMockedState,
            createEvent: createEventMock,
          }}
        >
          <NewEventForm {...props} />
        </Provider>
      </LocalizationProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "My Event" },
    });

    await act(() => {
      fireEvent.click(screen.getByRole("create-event-button"));
    });

    expect(createEventMock).toBeCalled();
  });

  it('should show a spinner when "isLoading" is true', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider
          eventContextState={{
            eventsState: {
              newEvent: {
                data: null,
                error: null,
                isLoading: true,
              },
            },
            createEvent: jest.fn(),
            resetNewEvent: jest.fn(),
          }}
        >
          <NewEventForm {...props} />
        </Provider>
      </LocalizationProvider>
    );

    expect(screen.getByRole("loading-spinner")).toBeInTheDocument();
  });
  it("should show a success message when an event is created and clear", async () => {
    jest.useFakeTimers();
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider
          eventContextState={{
            eventsState: {
              newEvent: {
                data: {
                  name: "My Event",
                  date: new Date().toISOString(),
                  alarm: "at-the-time-of-the-event",
                  repeat: "never",
                  createdAt: new Date().toISOString(),
                  __v: 0,
                  id: "123",
                },
                error: null,
                isLoading: false,
              },
            },
            createEvent: jest.fn(),
            resetNewEvent: jest.fn(),
          }}
        >
          <NewEventForm {...props} />
        </Provider>
      </LocalizationProvider>
    );

    const successMessage = await screen.findByText(
      "Event My Event created",
      {},
      { timeout: 3000 }
    );

    expect(successMessage).toBeInTheDocument();
    expect(screen.getByRole("create-event-button")).toBeDisabled();

    await act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByRole("create-event-button")).not.toBeDisabled();
    });
  });

  it("should show an error message when an event is not created", async () => {
    jest.useFakeTimers();
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider
          eventContextState={{
            eventsState: {
              newEvent: {
                data: null,
                error: "Error creating event",
                isLoading: false,
              },
            },
            createEvent: jest.fn(),
            resetNewEvent: jest.fn(),
          }}
        >
          <NewEventForm {...props} />
        </Provider>
      </LocalizationProvider>
    );

    const errorMessage = await screen.findByText(
      "Error creating event",
      {},
      { timeout: 3000 }
    );

    expect(errorMessage).toBeInTheDocument();

    await act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByRole("create-event-button")).not.toBeDisabled();
    });
  });
});
