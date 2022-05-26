import { FC, PropsWithChildren, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

type Props = {};

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Ex nostrud occaecat dolor magna ad.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "In-Progress Sint labore laboris sit veniam consequat labore in.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Finished - Est aliquip deserunt ea sunt Lorem amet ad labore.",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "Entry - Add-Entry", payload: newEntry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
