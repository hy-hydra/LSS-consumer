// @mui
import { Typography, TextField, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function PaymentBillingAddress() {
  return (
    <div>
      <Typography variant="h6">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <TextField autoCapitalize="none" fullWidth label="Person name" />
        <TextField autoCapitalize="none" fullWidth label="Phone number" />
        <TextField autoCapitalize="none" fullWidth label="Email" />
        <TextField autoCapitalize="none" fullWidth label="Address" />
      </Stack>
    </div>
  );
}
