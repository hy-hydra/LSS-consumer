import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { Box, DialogContent, Stack, Typography, MenuItem, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { CustomLoginTextField } from '../text-field';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
import { CustomSelectTextField } from '../text-field/CustomSelectTextField';
// hook
import useResponsive from '../../hooks/useResponsive';
import FormProvider from '../hook-form';
import { getCountry } from '../../utils/country';
import { createPayment, userUpdate } from '../../services/user';

export const defaultValuesCard = {
  cardNumber: '',
  expiryDate: new Date(),
  cvc: '',
  country: '',
};

const FormSchemaCard = Yup.object().shape({
  cardNumber: Yup.string()
    .min(14, 'Card number is 14 to 16 digits long.')
    .max(16, 'Card number is 14 to 16 digits long.')
    .required('Card Number is required'),
  expiryDate: Yup.date()
    .min(new Date(), 'Expiry Date must be later than today')
    .required('Expiry Date is required'),
  cvc: Yup.string()
    .required('CVC is required')
    .min(3, 'Minimum 3 digits code')
    .max(4, 'Maximum 4 digits code'),
  country: Yup.string().required('Country is required'),
});

export default function PaymentDialog({
  isOpenDialog,
  handleOpenDialog,
  handleOpenSuccessDialog,
  handleOpenFailureDialog,
}) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');

  const methods = useForm({
    resolver: yupResolver(FormSchemaCard),
    defaultValues: defaultValuesCard,
  });

  const {
    // watch,
    reset,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('DATA', data);
      await createPayment(data);
      await userUpdate({ auth_status: 9 });
      handleOpenDialog();
      handleOpenSuccessDialog();
      reset();
    } catch (error) {
      handleOpenDialog();
      handleOpenFailureDialog();
      console.log('something went wrong:', error);
    }
  };

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      width={!isMobile ? '520px' : '100%'}
      radius={isMobile ? 0 : undefined}
      fullScreen={isMobile}
    >
      <DialogContent
        sx={{
          paddingX: 2,
          paddingY: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap={2} alignContent="center">
          <Stack gap={0.5}>
            <Typography
              sx={{ fontWeight: '700', fontSize: isMobile ? '24px' : '28px', textAlign: 'center' }}
            >
              First payment due today.
            </Typography>
            <Typography variant="body" textAlign="center">
              Membership dues are $1,000 per month.
            </Typography>
          </Stack>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Card Number</Typography>
                  <CustomLoginTextField
                    fullWidth
                    name="cardNumber"
                    placeholder="Enter card number"
                    imgSrc="/assets/icons/payments/ic_credit_card.svg"
                  />
                </Box>
                {!isMobile ? (
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
                ) : (
                  <>
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
                  </>
                )}
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
                    <MenuItem value="">None</MenuItem>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {getCountry().map((option) => (
                      <MenuItem key={option.code} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelectTextField>
                </Box>
              </>
            </Box>
            <LoginButton
              loading={isSubmitting}
              type="submit"
              sx={{ marginTop: 4, textTransform: 'none' }}
            >
              Activate membership!
            </LoginButton>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

PaymentDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleOpenSuccessDialog: PropTypes.func.isRequired,
  handleOpenFailureDialog: PropTypes.func.isRequired,
};
