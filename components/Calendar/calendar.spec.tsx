import { LocalizationProvider } from '@mui/x-date-pickers';
import Router from 'next/router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './index';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('Calendar -> when is mounted', () => {
  const setNewEventProp = jest.fn();

  beforeEach(() => {
    // Returns the dom from Calendar component
    const props = {
      setNewEvent: setNewEventProp,
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Calendar {...props} />
      </LocalizationProvider>,
    );
  });

  it('should render a calendar', () => {
    expect(screen.getByRole('calendar')).toBeInTheDocument();
  });

  it('should render an add event button', () => {
    expect(screen.getByRole('add-event')).toBeInTheDocument();
  });

  it('shoud execute setNewEvent prop when user clicks add button', () => {
    const addNewEventButton = screen.getByRole('add-event');

    fireEvent.click(addNewEventButton);

    expect(setNewEventProp).toBeCalled();
  });

  it('shoud send to the page of the selected date', () => {
    const dateInput = screen.getByLabelText('date');

    fireEvent.change(dateInput, {
      target: { value: '02/21/2023' },
    });

    expect(mockRouter.pathname).toEqual('/date/21-02-2023');
  });
});
