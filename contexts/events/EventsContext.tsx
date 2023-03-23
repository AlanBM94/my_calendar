import { createContext } from "react";
import { EventsState, Event } from "@/interfaces/events";

interface ContextProps {
  state: EventsState;
  createEvent: (event: Event) => void;
  resetNewEvent: () => void;
}

export const EventsContext = createContext({} as ContextProps);
