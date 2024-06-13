import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
import { Stack } from '@mui/system';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  onEdit: PropTypes.func,
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export default function CheckoutBillingInfo({ billing, onEdit, onBackStep, enableEdit = false }) {
  return (
    <Card sx={{ boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)', width: '100%' }}>
      <CardHeader
        title="Billing Address"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
              Edit
            </Button>
          )
        }
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            {billing?.name}&nbsp;
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              (Home)
            </Typography>
          </Typography>

          <Typography variant="body2" gutterBottom>
            {billing?.address}, {billing?.city}, {billing?.state} / {billing?.zip}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {billing?.phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
