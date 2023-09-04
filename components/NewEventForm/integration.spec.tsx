import calendarAPI from "@/api/index";
import { EventsProvider } from "@/contexts/index";
import { act } from "react-dom/test-utils";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { props } from "./newEventForm.spec";
import NewEventForm from "./index";

jest.mock("@/api/index");

describe("Integration tests to create a new event", () => {
  it("should create a new event successfully", async () => {
    const mockPost = calendarAPI.post as jest.MockedFunction<
      typeof calendarAPI.post
    >;

    const eventName = "Estudiar React";

    // Define what the mock should return when the API is called
    mockPost.mockResolvedValueOnce({
      status: 201,
      data: {
        data: {
          event: {
            name: eventName,
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EventsProvider>
          <NewEventForm {...props} />
        </EventsProvider>
      </LocalizationProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: eventName },
    });

    await act(() => {
      fireEvent.click(screen.getByRole("create-event-button"));
    });

    const successMessage = await screen.findByText(
      `Event ${eventName} created`
    );

    expect(successMessage).toBeInTheDocument();
  });
});
