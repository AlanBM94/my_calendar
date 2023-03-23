export interface Event {
  name: string;
  date: string;
  repeat?: string;
  alarm?: string;
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
}

export interface EventResponse {
  data: {
    event: EventPayload;
  };
}
