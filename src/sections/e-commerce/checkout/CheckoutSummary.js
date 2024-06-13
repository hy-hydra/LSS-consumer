import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  onEdit: PropTypes.func,
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';

  return (
    <Card
      sx={{
        boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)',
        width: '100%',
      }}
    >
      <CardHeader
        title="Order Summary"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack display="flex" justifyContent="space-between" spacing={4}>
          <Stack flex spacing={2.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Total Item Cost
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
            </Stack>
            {/* <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Saved
              </Typography>
              <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
            </Stack> */}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="subtitle2">
                {shipping ? fCurrency(shipping) : displayShipping}
              </Typography>
            </Stack>
          </Stack>

          <Stack flex spacing={2.5}>
            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 24, fontWeight: 600, color: 'black' }}
              >
                Total
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 24, fontWeight: 600, color: 'black' }}
                >
                  {fCurrency(total)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
