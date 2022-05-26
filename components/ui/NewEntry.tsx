import { ChangeEvent, useState, useContext } from "react";
import { AddCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setWasTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label="Nueva entrada"
            placeholder="Nueva entrada"
            helperText={
              inputValue.length <= 0 && wasTouched && "Ingrese un valor"
            }
            value={inputValue}
            onChange={onTextChange}
            error={inputValue.length <= 0 && wasTouched}
            onBlur={() => setWasTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddCircleOutline />}
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};

export default NewEntry;
