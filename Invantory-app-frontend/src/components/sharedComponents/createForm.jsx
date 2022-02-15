import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";

const CreateForm = ({ handleSubmit, formData, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ minWidth: 100, maxWidth: 200 }}>
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          variant="standard"
          value={formData.name ?? ""}
          onChange={handleChange}
        />
        <TextField
          id="outlined-volumeInMl"
          label="Volume In Ml"
          name="volumeInMl"
          variant="standard"
          value={formData.volumeInMl ?? ""}
          onChange={handleChange}
        />
        <TextField
          id="outlined-criticalVolume"
          label="Critical Volume"
          name="criticalVolume"
          variant="standard"
          value={formData.criticalVolume ?? ""}
          onChange={handleChange}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;
