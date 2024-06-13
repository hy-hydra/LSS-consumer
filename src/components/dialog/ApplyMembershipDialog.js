import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { Box, DialogContent, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import { CustomLoginTextField } from '../text-field';
import { LoginCustomLink } from '../link';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// hook
import FormProvider from '../hook-form';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
import CustomNotification from '../custom-notification/CustomNotification';

export const defaultValues = {
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
};

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invaild Email').required('Email is required'),
  userName: Yup.string().required('User name is required'),
  password: Yup.string().required('Password is required'),
});

export default function ApplyMembershipDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();
  const { register } = useAuthContext();

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
    if (loading || success) return;
    setLoading(true);
    register(values.email, values.userName, values.password)
      .then(async () => {
        setLoading(false);
        setSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        handleOpenDialog();
        await router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.MAIL_VERIFYING));
        reset();
        setSuccess(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        setErrorMsg(error?.email || error?.username || error?.password || 'Something went wrong');
        console.error('Register error:', error);
      });
  };

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '32px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="16px" justifyContent="center" alignContent="center">
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '32.4px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            Apply for membership
          </Typography>
          <CustomNotification
            isOpen={isError}
            onClose={() => setIsError(false)}
            type="warning"
            title={errorMsg || ''}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <CustomLoginTextField
                fullWidth
                name="email"
                placeholder="Email"
                imgSrc="/assets/icons/auth/ic_email.svg"
              />
              <CustomLoginTextField
                fullWidth
                name="userName"
                placeholder="Name"
                imgSrc="/assets/icons/auth/ic_user.svg"
              />
              <CustomLoginTextField
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                imgSrc="/assets/icons/auth/ic_lock.svg"
              />
              <LoginButton loading={loading} type="submit">
                {success ? 'Success.' : 'Continue'}
              </LoginButton>
              <Typography
                sx={{
                  fontWeight: '300',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '-0.01em',
                  textAlign: 'center',
                }}
              >
                Already have an account?{' '}
                <LoginCustomLink
                  onClick={() => {
                    handleOpenDialog();
                    router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.SIGN_IN));
                  }}
                >
                  Login
                </LoginCustomLink>
              </Typography>
            </Box>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

ApplyMembershipDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
