import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Card,
  Radio,
  Stack,
  Paper,
  Button,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
  Divider,
} from '@mui/material';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import { hideCardNumber } from '../../../../utils/formatString';
// hook
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  cardOptions: PropTypes.array,
  paymentOptions: PropTypes.array,
  onApplyPaymentMethod: PropTypes.func,
  onOpen: PropTypes.func,
};

export default function CheckoutPaymentMethods({
  paymentOptions,
  onApplyPaymentMethod,
  onOpen,
  ...other
}) {
  const { control } = useFormContext();
  const isMobile = useResponsive('down', 'sm');

  return (
    <Card sx={{ mb: 3, boxShadow: 'none' }}>
      <CardHeader
        title={
          <>
            <Typography variant="h6">Payment Methods</Typography>
            <Typography variant="body2">How do you want to pay for this order?</Typography>
          </>
        }
        action={
          <Stack>
            <Button
              variant="outlined"
              color="inherit"
              onClick={onOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{
                borderRadius: 20,
                padding: '10px 16px',
                ...(isMobile ? { display: 'none' } : {}),
              }}
            >
              Add
            </Button>
          </Stack>
        }
        sx={{
          mb: 3,
          '& .MuiCardHeader-action': {
            margin: 0,
            alignSelf: 'center',
          },
        }}
      />
      <Divider sx={{ width: '100%' }} />
      <CardContent sx={{ p: 0 }}>
        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <RadioGroup
                row
                {...field}
                onChange={(event) => {
                  const { value } = event.target;
                  field.onChange(Number(value));
                  onApplyPaymentMethod(Number(value));
                }}
              >
                <Stack spacing={3} sx={{ width: 1, marginY: 3 }}>
                  {paymentOptions.map((option) => (
                    <PaymentOption
                      key={option.id}
                      option={option}
                      isSelected={field.value === option.id}
                      onOpen={onOpen}
                    />
                  ))}
                </Stack>
              </RadioGroup>

              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

PaymentOption.propTypes = {
  onOpen: PropTypes.func,
  option: PropTypes.object,
  isSelected: PropTypes.bool,
};

function PaymentOption({ option, isSelected, onOpen }) {
  const { id, is_default, method, provider } = option;
  const isCard = method === 'card';

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        transition: (theme) => theme.transitions.create('all'),
        ...(isSelected && {
          boxShadow: (theme) => theme.customShadows.z20,
        }),
      }}
    >
      <FormControlLabel
        key={id}
        value={id}
        control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
        label={
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              ml: 1,
              justifyContent: { xs: 'start', sm: 'space-between' },
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                justifyContent: { xs: 'space-between', sm: 'start' },
                alignItems: 'center',
              }}
            >
              <Stack flexDirection="row" justifyContent="start" alignItems="center" gap={1}>
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
                <Typography variant="body2" flex={1} sx={{ color: 'text.secondary' }}>
                  {isCard ? 'Master Card ending with' : 'US bank account ending with'}
                </Typography>
              </Stack>
              <Stack flexDirection="row" gap={1} justifyContent="center" alignItems="center">
                <Typography variant="subtitle2">
                  {isCard ? hideCardNumber(provider) : hideCardNumber(provider)}
                </Typography>
                <Typography variant="subtitle2">{is_default ? `(Default)` : ''}</Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              color="primary"
              // onClick={handleOpen}
              startIcon={<Iconify icon="eva:edit-fill" />}
              sx={{
                borderRadius: 20,
                padding: '10px 16px',
                minWidth: 140,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Edit
            </Button>
          </Box>
        }
        sx={{
          py: 3,
          px: 2.5,
          width: '100% !important',
          '& .MuiFormControlLabel-label': { width: '100%' },
        }}
      />
    </Paper>
  );
}
