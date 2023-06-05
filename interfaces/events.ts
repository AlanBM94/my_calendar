export interface Event {
  name: string;
  date: string;
  repeat?: string;
  alarm?: string;
  id?: string;
}

export interface ModifyEvent {
  name: string;
  date: string;
  repeat?: string;
  alarm?: string;
  id?: string;
}

export interface EventPayload {
  name: string;
  date: string;
  repeat: string;
  alarm: string;
  createdAt: string;
  __v: number;
  id: string;
}

export interface EventsState {
  newEvent: {
    isLoading: boolean;
    error: string | null;
    data: EventPayload | null;
  };
  deleteEvent: {
    isLoading: boolean;
    error: string | null;
    isDeleted: boolean;
  };
  updateEvent: {
    isLoading: boolean;
    error: string | null;
    data: EventPayload | null;
  };
  events: EventPayload[];
  selectedEvent: Event | null;
}

export interface EventResponse {
  data: {
    event: EventPayload;
  };
}

export interface GetEventsResponse {
  data: {
    events: EventPayload[];
  };
}

export interface ContextProps {
  eventsState: EventsState;
  createEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  selectEvent: (event: Event | null) => void;
  resetNewEvent: () => void;
  setEvents: (events: EventPayload[]) => void;
  resetDeletedEvent: () => void;
  resetUpdatedEvent: () => void;
  removeEventFromState: (id: string) => void;
}

export interface EventsListProps {
  events: EventPayload[];
}
