import { createContext } from "react";

interface ContextProps {
  entries: []; //TODO: missing data type
}

export const EntriesContext = createContext({} as ContextProps);
