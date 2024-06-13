import React from 'react';
// @mui
import { useTheme } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Typography, Box, MenuItem } from '@mui/material';
// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// hook
import useResponsive from '../../../hooks/useResponsive';
import FormProvider from '../../../components/hook-form/FormProvider';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { CustomSelectTextField } from '../../../components/text-field/CustomSelectTextField';
// utils
import { hideCardNumber } from '../../../utils/formatString';

// ----------------------------------------------------------------------

SponsoredBy.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const defaultValuesSubscribe = {
  subscribedCard: '123456789123453',
};

const defaultValuesPayment = {
  paymentCard: '123456789127393',
};

const FormSchemaSubscribe = Yup.object().shape({
  subscribedCard: Yup.string()
    .min(14, 'Card number is 14 to 16 digits long.')
    .max(16, 'Card number is 14 to 16 digits long.')
    .required('Card Number is required'),
});

const FormSchemaPayment = Yup.object().shape({
  paymentCard: Yup.string()
    .min(14, 'Card number is 14 to 16 digits long.')
    .max(16, 'Card number is 14 to 16 digits long.')
    .required('Card Number is required'),
});

const subscribedCards = [
  {
    label: hideCardNumber('123456789123453'),
    value: '123456789123453',
  },
  {
    label: hideCardNumber('123446289123456'),
    value: '123446289123456',
  },
  {
    label: hideCardNumber('123473891234568'),
    value: '123473891234568',
  },
  {
    label: hideCardNumber('123456789127393'),
    value: '123456789127393',
  },
];

export default function SponsoredBy() {
  const theme = useTheme();
  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');

  const methodsSubscribe = useForm({
    resolver: yupResolver(FormSchemaSubscribe),
    defaultValues: defaultValuesSubscribe,
  });

  const methodsPayment = useForm({
    resolver: yupResolver(FormSchemaPayment),
    defaultValues: defaultValuesPayment,
  });

  const {
    handleSubmit: handleSubmitSubscribe,
    formState: { isSubmitting: isSubmittingSubscribe },
  } = methodsSubscribe;

  const {
    handleSubmit: handleSubmitPayment,
    formState: { isSubmitting: isSubmittingPayment },
  } = methodsPayment;

  const onSubmitSubscribe = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('DATA', data);
  };

  const onSubmitPayment = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('DATA', data);
  };

  return (
    <Box
      sx={{
        padding: isDesktopL || isDesktopN ? '40px' : '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: { xl: '582px', lg: '582px', md: '100%', sm: '406px', xs: '100%' },
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography sx={{ fontWeight: '300', fontSize: '16px' }}>
        Seems like you’re sponsored by some, however you can always remove the sponsor & add your
        own payment method.
      </Typography>
      <Box
        sx={{
          gap: '32px',
          pr: '96px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            gap: '24px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography sx={{ fontWeight: '600', fontSize: '24px' }}>Sponsored by</Typography>
          <Box
            sx={{
              gap: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomAvatar
              src="/assets/avatar.png"
              sx={{
                width: '48px',
                height: '48px',
                boxShadow: '0px 4px 16px 0px #00000026',
                border: '1.5px solid #FFFFFF',
              }}
            />
            <Typography sx={{ fontWeight: '700', fontSize: '18px' }}>Joe Einhorn</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            gap: '32px',
            display: 'flex',
            flexDirection: isTabletL ? 'row' : 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <FormProvider
              methods={methodsSubscribe}
              onSubmit={handleSubmitSubscribe(onSubmitSubscribe)}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'start',
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                    Payment Method for Subscription
                  </Typography>
                  <CustomSelectTextField
                    fullWidth
                    prefix="ending with "
                    displayValue={hideCardNumber}
                    name="subscribedCard"
                    placeholder="Select card"
                    imgSrc="/assets/icons/payments/ic_credit_card.svg"
                  >
                    {subscribedCards.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelectTextField>
                </Box>
                <LoadingButton
                  loading={isSubmittingSubscribe}
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: theme.palette.primary.darker,
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    borderRadius: 6,
                    py: '14px',
                    mx: '0px !important',
                    width: { xs: '100%' },
                  }}
                >
                  <Typography sx={{ fontWeight: '400', fontSize: '14px', color: '#FFFFFF' }}>
                    Remove payment method.
                  </Typography>
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormProvider methods={methodsPayment} onSubmit={handleSubmitPayment(onSubmitPayment)}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <Box
                  sx={{
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'start',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontWeight: '600', fontSize: '16px', textAlign: 'left' }}>
                    Payment Method for Orders
                  </Typography>
                  <CustomSelectTextField
                    fullWidth
                    displayValue={hideCardNumber}
                    name="paymentCard"
                    prefix="ending with "
                    placeholder="Select card"
                    imgSrc="/assets/icons/payments/ic_credit_card.svg"
                  >
                    {subscribedCards.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelectTextField>
                </Box>
                <LoadingButton
                  loading={isSubmittingPayment}
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: theme.palette.primary.darker,
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    borderRadius: 6,
                    py: '14px',
                    mx: '0px !important',
                    width: { xs: '100%' },
                  }}
                >
                  Remove payment method.
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------
