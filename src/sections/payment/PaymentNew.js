import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import {
  Box,
  Stack,
  Typography,
  Button,
  MenuItem,
  Divider,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// components
import { CustomLoginTextField } from '../../components/text-field';
import { CustomSelectTextField } from '../../components/text-field/CustomSelectTextField';
// hook
import FormProvider from '../../components/hook-form/FormProvider';
import { getCountry } from '../../utils/country';

// ----------------------------------------------------------------------

PaymentNew.propTypes = {
  isNew: PropTypes.bool,
  onClose: PropTypes.func,
  onCreatPaymentMethod: PropTypes.func,
};

export default function PaymentNew({ onClose, isNew, onCreatPaymentMethod, ...other }) {
  const defaultValuesCard = {
    cardNumber: '',
    expiryDate: new Date(),
    cvc: '',
    country: '',
  };

  const defaultValuesBank = {
    email: '',
    fullName: '',
    search: '',
  };

  const FormSchemaCard = Yup.object().shape({
    cardNumber: Yup.string().required('Card Number is required'),
    expiryDate: Yup.date()
      .min(new Date(), 'Expiry Date must be later than today')
      .required('Expiry Date is required'),
    cvc: Yup.string().required('CVC is required').length(3, 'CVC has 3 digits code'),
    country: Yup.string().required('Country is required'),
  });

  const FormSchemaBank = Yup.object().shape({
    email: Yup.string().email('Invaild Email').required('Email is required'),
    fullName: Yup.string().required('Full Name is required'),
    search: Yup.string(),
  });

  const theme = useTheme();

  const [paymentMethod, setPaymentMethod] = React.useState('card');

  const methods = useForm({
    resolver: yupResolver(paymentMethod === 'card' ? FormSchemaCard : FormSchemaBank),
    defaultValues: paymentMethod === 'card' ? defaultValuesCard : defaultValuesBank,
  });

  const {
    // watch,
    // reset,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      onCreatPaymentMethod();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethod(value);
  };

  return (
    <>
      <DialogTitle>
        {isNew ? 'Add shipping address.' : 'Edit shipping address.'}
        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>
          {isNew ? 'Please add a new shipping address.' : 'Please edit shipping address.'}
        </Typography>
      </DialogTitle>
      <Divider sx={{ mb: 3 }} />
      <Stack gap="24px" alignContent="center" sx={{ maxWidth: { xs: '100%', lg: '424px' } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', gap: '24px' }}>
              <Button
                fullWidth
                sx={{
                  border: '1px solid transparent',
                  ...(paymentMethod === 'card'
                    ? { opacity: 1, borderColor: theme.palette.primary.contrastText }
                    : { opacity: 0.7 }),
                  padding: '16px 20px',
                  display: 'flex',
                  borderRadius: '16px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                onClick={() => handleChangePaymentMethod('card')}
              >
                <Box
                  component="img"
                  src="/assets/icons/payments/ic_credit_card.svg"
                  alt="Credit Card"
                  width="24px"
                />
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px',
                    color: theme.palette.primary.contrastText,
                    textAlign: 'start',
                  }}
                >
                  Card
                </Typography>
              </Button>
              <Button
                fullWidth
                sx={{
                  border: '1px solid transparent',
                  ...(paymentMethod === 'bank'
                    ? { opacity: 1, borderColor: theme.palette.primary.contrastText }
                    : { opacity: 0.7 }),
                  padding: '16px 20px',
                  display: 'flex',
                  borderRadius: '16px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                onClick={() => handleChangePaymentMethod('bank')}
              >
                <Box
                  component="img"
                  src="/assets/icons/payments/ic_bank.svg"
                  alt="Bank"
                  width="24px"
                />
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px',
                    color: theme.palette.primary.contrastText,
                    textAlign: 'start',
                  }}
                >
                  US Bank Account
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {paymentMethod === 'card' ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                      Card Number
                    </Typography>
                    <CustomLoginTextField
                      fullWidth
                      name="cardNumber"
                      placeholder="Enter 14 digit card number"
                      imgSrc="/assets/icons/payments/ic_credit_card.svg"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flex: 1,
                        gap: '10px',
                      }}
                    >
                      <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                        Expiry date
                      </Typography>
                      <CustomLoginTextField
                        fullWidth
                        name="expiryDate"
                        type="date"
                        minDate={new Date()}
                        placeholder="Enter expiry date"
                        imgSrc="/assets/icons/payments/ic_calendar.svg"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flex: 1,
                        gap: '10px',
                      }}
                    >
                      <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>CVC</Typography>
                      <CustomLoginTextField
                        fullWidth
                        name="cvc"
                        placeholder="Enter CVC code"
                        imgSrc="/assets/icons/auth/ic_lock.svg"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Country</Typography>
                    <CustomSelectTextField name="country" placeholder="Select country">
                      {/* <MenuItem value="">None</MenuItem> */}
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      {getCountry().map((option) => (
                        <MenuItem key={option.code} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelectTextField>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Email</Typography>
                    <CustomLoginTextField
                      fullWidth
                      name="email"
                      placeholder="Enter email"
                      imgSrc="/assets/icons/auth/ic_email.svg"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Full Name</Typography>
                    <CustomLoginTextField
                      fullWidth
                      name="fullName"
                      value=""
                      placeholder="First & last name"
                      imgSrc="/assets/icons/auth/ic_user.svg"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                      Bank Account
                    </Typography>
                    <CustomLoginTextField
                      fullWidth
                      name="search"
                      placeholder="Search for your bank"
                      imgSrc="/assets/icons/payments/ic_search.svg"
                    />
                  </Box>
                </>
              )}
            </Box>
          </DialogContent>

          <DialogActions
            sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                backgroundColor: '#0F172A',
                color: 'white',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 400,
                py: 1,
                mx: '0px !important',
                width: { xs: '100%' },
              }}
            >
              Save
            </LoadingButton>
            <Button
              color="inherit"
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 400,
                py: 1,
                mx: '0px !important',
                width: { xs: '100%' },
              }}
            >
              Cancel
            </Button>{' '}
          </DialogActions>
        </FormProvider>
      </Stack>
    </>
  );
}
