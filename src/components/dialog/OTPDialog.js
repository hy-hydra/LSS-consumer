import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { Box, DialogContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { CustomLoginTextField } from '../text-field';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// hook
import FormProvider from '../hook-form';
// custom axios
import axios from '../../utils/axios';

export const defaultValues = {
  email: '',
};

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invaild Email').required('Email is required'),
});

export default function OTPDialog({
  isOpenDialog,
  handleOpenDialog,
  handleOpenNextDialog,
  setEmail,
}) {
  const theme = useTheme();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    // watch,
    reset,
    // control,
    // setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (loading || success) return;
    setLoading(true);
    try {
      await axios.get('/users/account/forgotPassword', {
        params: { email: `${values.email}` },
      });
      setLoading(false);
      setSuccess(true);
      setEmail(values.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleOpenDialog();
      handleOpenNextDialog();
      reset();
      setSuccess(false);
    } catch (error) {
      setLoading(false);
      console.error(error.error || 'Something went wrong');
    }
  };

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px" justifyContent="center" alignContent="center">
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CustomLoginTextField
                fullWidth
                name="email"
                placeholder="Email"
                imgSrc="/assets/icons/auth/ic_email.svg"
              />
              <LoginButton loading={loading} type="submit">
                {success ? 'OTP sent successfully.' : 'Send OTP.'}
              </LoginButton>
            </Box>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

OTPDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleOpenNextDialog: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
};
