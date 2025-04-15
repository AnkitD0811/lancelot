import { Switch, FormControl, FormLabel } from "@mui/joy";

function AlarmSwitch() {
  return (
    <FormControl orientation="horizontal" sx={{ gap: 1, alignItems: 'center' }}>
      <FormLabel>Alarm</FormLabel>
      <Switch
        sx={{
          '--Switch-track-width': '6px',
          '--Switch-track-height': '34px',
          '--Switch-thumb-size': '28px',
        }}
      />
    </FormControl>
  );
}

export default AlarmSwitch;
