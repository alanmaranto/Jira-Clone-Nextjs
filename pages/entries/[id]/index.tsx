import { ChangeEvent, useMemo, useState, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import { SaveOutlined, DeleteOutline } from "@mui/icons-material";
import { Layout } from "../../../components/layouts";
import { Entry, EntryStatus } from "../../../interfaces";
import { dbEntries } from "../../../database";
import { EntriesContext } from "../../../context/entries";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => {
    return inputValue.length <= 0 && touched;
  }, [inputValue, touched]);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    //1 way to update the entry
    /*     const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    } */

    updateEntry({ ...entry, description: inputValue, status }, true);
  };

  const onDelete = () => {
    deleteEntry(entry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry:`}
              subheader={`Created: ${entry.createdAt} minutes ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New entry"
                label="New entry"
                multiline
                autoFocus
                value={inputValue}
                onChange={onInputValueChanged}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && "Add a value"}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDelete}
      >
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // ctx

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
