import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AlarmSelect from "./index";

// A mock function for the setRepeatPeriod prop
const setAlarm = jest.fn();

describe("<AlarmSelect />", () => {
  beforeEach(() => {
    // Render the component with the mock function and initial repeat value before each test
    render(
      <AlarmSelect alarm="at-the-time-of-the-event" setAlarm={setAlarm} />
    );
  });

  // combobox is the role for a Select element
  test("renders correctly with initial props", () => {
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("at-the-time-of-the-event");
  });

  test("calls setAlarm when the value changes", () => {
    // Change the value of the Select to "Every day"
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(selectElement, {
      target: { value: "1-week-before-the-event" },
    });

    expect(setAlarm).toHaveBeenCalledWith("1-week-before-the-event");
  });
});
