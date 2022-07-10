import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

type Props = {};

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "Entry - Fetch-Entries", payload: data });
  };

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({ type: "Entry - Add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const res = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "Entry - Entry-Updated", payload: res.data });
      refreshEntries();
      if (showSnackbar) {
        enqueueSnackbar("Entry updated successfully", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const res = await entriesApi.delete<Entry>(`/entries/${entry._id}`);
      if (res.status === 200) {
        dispatch({ type: "Entry - Entry-Deleted", payload: res.data });
        refreshEntries();

        if (showSnackbar) {
          enqueueSnackbar("Entry deleted successfully", {
            variant: "success",
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
