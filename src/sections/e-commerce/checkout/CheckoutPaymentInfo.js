import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent, Stack } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import { hideCardNumber } from '../../../utils/formatString';

// ----------------------------------------------------------------------

CheckoutPaymentInfo.propTypes = {
  onEdit: PropTypes.func,
  paymentMethod: PropTypes.object,
  onBackStep: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export default function CheckoutPaymentInfo({
  paymentMethod,
  onEdit,
  onBackStep,
  enableEdit = false,
}) {
  const { id, method, provider } = paymentMethod;
  const isCard = method === 'card';
  // const { id, type, provider } = paymentMethod;
  // const isCard = type === 'card';

  return (
    <Card sx={{ boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)', width: '100%' }}>
      <CardHeader
        title="Payment Details"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack display="flex" justifyContent="space-between">
          <Stack flex spacing={2.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Payment Method
              </Typography>
              <Stack flex flexDirection="row" justifyContent="center" alignItems="center" gap={1}>
                <Image
                  key={id}
                  disabledEffect
                  alt="logo card"
                  src={
                    isCard
                      ? '/assets/icons/payments/ic_credit_card.svg'
                      : '/assets/icons/payments/ic_bank.svg'
                  }
                  sx={{ '& .wrapper': { width: 32, objectFit: 'contain !important' } }}
                />
                <Typography variant="subtitle2">
                  {isCard ? 'Credit Card' : 'Bank Transfer'}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {isCard ? 'Master Card ending with' : 'US bank account ending with'}
              </Typography>
              <Typography variant="subtitle2">{hideCardNumber(provider || '')}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Status
              </Typography>
              <Typography variant="subtitle2">Active</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Transaction
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Pending
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
