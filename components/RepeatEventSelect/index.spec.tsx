import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RepeatEventSelect from "./index";

// A mock function for the setRepeatPeriod prop
const mockSetRepeatPeriod = jest.fn();

describe("<RepeatEventSelect />", () => {
  beforeEach(() => {
    // Render the component with the mock function and initial repeat value before each test
    render(
      <RepeatEventSelect repeat="never" setRepeatPeriod={mockSetRepeatPeriod} />
    );
  });

  // combobox is the role for a Select element
  test("renders correctly with initial props", () => {
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("never");
  });

  test("calls setRepeatPeriod when the value changes", () => {
    // Change the value of the Select to "Every day"
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: "every-day" } });

    expect(mockSetRepeatPeriod).toHaveBeenCalledWith("every-day");
  });
});
