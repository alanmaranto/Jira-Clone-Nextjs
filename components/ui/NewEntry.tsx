import React from "react";
import { AddCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      <Button variant="outlined" fullWidth startIcon={<AddCircleOutline />}>
        Agregar tarea
      </Button>
      <TextField
        fullWidth
        sx={{ marginTop: 2, marginBottom: 1 }}
        autoFocus
        multiline
        label="Nueva entrada"
        placeholder="Nueva entrada"
        helperText="Ingrese un valor"
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="text">
          Cancelar
        </Button>
        <Button variant="outlined" color="secondary" endIcon={<SaveOutlined />}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default NewEntry;
