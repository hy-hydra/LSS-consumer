import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { CustomLoginTextField } from '../text-field';
import { LoginCustomLink } from '../link';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
import { useAuthContext } from '../../auth/useAuthContext';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// hook
import FormProvider from '../hook-form';
import CustomNotification from '../custom-notification';

export const defaultValues = {
  email: '',
  password: '',
};

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invaild email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuthContext();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);

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
    try {
      if (loading || success) return;

      setLoading(true);
      await login(values.email, values.password);
      setLoading(false);
      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await router.push(PATH_PAGE.home.root);
      reset();
      setSuccess(false);
    } catch (error) {
      setIsError(true);
      setErrorMsg(error?.error || 'Something went wrong');
      console.log(error || 'Something went wrong');
      setLoading(false);
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
          <CustomNotification
            isOpen={isError}
            onClose={() => setIsError(false)}
            type="warning"
            title={errorMsg || ''}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CustomLoginTextField
                fullWidth
                name="email"
                placeholder="Email"
                imgSrc="/assets/icons/auth/ic_email.svg"
              />
              <CustomLoginTextField
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                imgSrc="/assets/icons/auth/ic_lock.svg"
              />
              <LoginButton loading={loading} type="submit">
                {success ? 'Login successful.' : 'Login'}
              </LoginButton>
            </Box>
          </FormProvider>
          <Typography
            sx={{
              fontWeight: '300',
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            Interested in joining us?{' '}
            <LoginCustomLink
              onClick={() => {
                handleOpenDialog();
                router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.SIGN_UP));
              }}
            >
              Apply for membership.
            </LoginCustomLink>
          </Typography>
          <Stack gap={1}>
            <LoginCustomLink
              style={{ marginInline: 'auto' }}
              onClick={() => {
                handleOpenDialog();
                router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.OTP));
              }}
            >
              Forgot password?
            </LoginCustomLink>
            <LoginCustomLink
              style={{ marginInline: 'auto' }}
              // onClick={() => {
              //   handleOpenDialog();
              //   router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.OTP));
              // }}
            >
              Member of the press?
            </LoginCustomLink>
          </Stack>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

LoginDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
