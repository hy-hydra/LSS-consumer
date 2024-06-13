import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { Box, DialogContent, Typography, Stack, MenuItem, Divider } from '@mui/material';
// components
import { CustomLoginTextField } from '../text-field';
import BaseDialog from './BaseDialog';
import { CustomSelectTextField } from '../text-field/CustomSelectTextField';
// hook
import FormProvider from '../hook-form';
import useResponsive from '../../hooks/useResponsive';
// utils
import { hideCardNumber } from '../../utils/formatString';

const defaultValues = {
  name: '',
  email: '',
  subscriptionCard: '123456789123453',
  paymentCard: '',
};

const subscriptionCards = [
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

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invaild Email').required('Email is required'),
  subscriptionCard: Yup.string().required(),
  paymentCard: Yup.string(),
});

export default function AddSponsorDialog({ isOpenDialog, handleOpenDialog, handleNextDialogOpen }) {
  const theme = useTheme();
  const isMobile = useResponsive('between', 'xs', 'sm');

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      console.log('DATA => ', values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleOpenDialog();
      handleNextDialogOpen();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      fullScreen={isMobile}
    >
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: { xs: '16px', sm: '32px' },
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack
          sx={{ gap: { xs: '4px', sm: '24px' }, justifyContent: 'center', alignContent: 'center' }}
        >
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '4px', sm: '24px' } }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: 1,
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Name</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="name"
                  placeholder="Maria Franci"
                  imgSrc="/assets/icons/auth/ic_user.svg"
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
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Email</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="email"
                  placeholder="maria_f@email.com"
                  imgSrc="/assets/icons/auth/ic_email.svg"
                />
              </Box>
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
                  Payment method for subscription
                </Typography>
                <CustomSelectTextField
                  fullWidth
                  displayValue={hideCardNumber}
                  name="subscriptionCard"
                  prefix="ending with "
                  placeholder="Select card"
                  imgSrc="/assets/icons/payments/ic_credit_card.svg"
                >
                  {subscriptionCards.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelectTextField>
              </Box>
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
                  Payment method for orders.
                </Typography>
                <CustomSelectTextField
                  fullWidth
                  displayValue={hideCardNumber}
                  name="paymentCard"
                  prefix="ending with "
                  placeholder="Select card"
                  imgSrc="/assets/icons/payments/ic_credit_card.svg"
                >
                  <MenuItem value="">None</MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {subscriptionCards.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelectTextField>
              </Box>
              <Box
                sx={{
                  gap: { xs: '4px', sm: '16px' },
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    borderRadius: 6,
                    py: '14px',
                  }}
                >
                  Add
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  sx={{
                    py: '14px',
                    backgroundColor: '#FFFFFF',
                    fontWeight: '400',
                    fontSize: '14px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 6,
                    color: theme.palette.primary.contrastText,
                    ':hover': {
                      boxShadow: '0px 4px 32px 0px #00000066',
                      backgroundColor: '#D6D6D6',
                      borderColor: 'transparent',
                    },
                  }}
                  onClick={() => {
                    handleOpenDialog();
                  }}
                >
                  Cancel
                </LoadingButton>
              </Box>
            </Box>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

AddSponsorDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleNextDialogOpen: PropTypes.func.isRequired,
};
