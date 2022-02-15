import React from "react";
import { Typography, Input, Button, TextField } from "@mui/material";

const EditForm = ({ handleSubmit, item, handleChange }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <Typography htmlFor="name">Name</Typography>
      <TextField
        name="name"
        defaultValue={item.name}
        onChange={handleChange}
        data-cy="edit-name"
        variant="standard"
      />
      <Typography htmlFor="volumeInMl">Volume in ml</Typography>
      <TextField
        name="volumeInMl"
        defaultValue={item.volume_in_ml}
        onChange={handleChange}
        data-cy="edit-volume"
        variant="standard"
      />
      <Typography htmlFor="criticalVolume">Critical Volume</Typography>
      <TextField
        name="criticalVolume"
        defaultValue={item.critical_volume}
        onChange={handleChange}
        data-cy="edit-criticalvolume"
        variant="standard"
      />
      <div>
        <Button variant="outlined" type="submit" sx={{ mt: 1 }}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
