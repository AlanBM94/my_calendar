import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EventsContext } from "../../contexts";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FC, ReactNode } from "react";
import NewEventForm from "./index";

jest.useFakeTimers();

describe("NewEventForm", () => {
  const setNewEventMock = jest.fn();

  beforeEach(() => {
    const props = {
      isVisible: false,
      setNewEvent: setNewEventMock,
    };

    const eventContextValue = {
      state: {
        newEvent: {
          isLoading: false,
          error: null,
          data: null,
        },
      },
      createEvent: jest.fn(),
      resetNewEvent: jest.fn(),
    };

    interface ProviderProps {
      children: ReactNode;
    }

    const Provider: FC<ProviderProps> = ({ children }) => {
      return (
        <EventsContext.Provider
          value={{
            createEvent: eventContextValue.createEvent,
            resetNewEvent: eventContextValue.resetNewEvent,
            state: eventContextValue.state,
          }}
        >
          {children}
        </EventsContext.Provider>
      );
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider>
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

  // it('should show error when user submits form without name', async () => {
  //   expect(screen.getByText(/name/i)).not.toHaveClass('Mui-error');

  //   await act(() => {
  //     fireEvent.click(screen.getByRole('create-event-button'));
  //   });

  //   expect(screen.getByText(/name/i)).toHaveClass('Mui-error');
  // });

  // it('should show error when user blur name without value', () => {
  //   expect(screen.getByText(/name/i)).not.toHaveClass('Mui-error');

  //   fireEvent.blur(screen.getByLabelText(/name/i), {
  //     target: { name: 'name', value: '' },
  //   });

  //   expect(screen.getByText(/name/i)).toHaveClass('Mui-error');
  // });

  // it('should clear name field when form is visible', () => {
  //   render(
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       <NewEventForm isVisible={true} setNewEvent={setNewEventMock} />
  //     </LocalizationProvider>,
  //   );

  //   expect(screen.getByLabelText(/name/i).textContent).toBe('');
  // });

  // it('should show new event created message', async () => {
  //   fireEvent.change(screen.getByLabelText(/name/i), {
  //     target: {
  //       name: 'name',
  //       value: 'Estudiar React',
  //     },
  //   });

  //   fireEvent.click(screen.getByRole('create-event-button'));

  //   expect(
  //     await screen.findByText(/event estudiar react created/i),
  //   ).toBeInTheDocument();

  //   await act(() => {
  //     jest.advanceTimersByTime(3000);
  //   });

  //   expect(screen.queryByText(/event estudiar react created/i)).toBeNull();
  // });
});
