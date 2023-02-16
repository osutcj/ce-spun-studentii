import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { AlertType } from '../../types/game';

export default function BasicAlerts(props:AlertType) {

  console.log(props.message);
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 20 }}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
        </Stack>
      </Container>
    </>
  );
}