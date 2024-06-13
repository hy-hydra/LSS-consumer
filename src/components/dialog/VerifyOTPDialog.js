import React from 'react';
import PropTypes from 'prop-types';
// validation
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DialogContent, Typography, Stack, Box, FormHelperText } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// hook
import FormProvider, { RHFCodes } from '../hook-form';
// components
import { LoginCustomLink } from '../link';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// custom axios
import axios from '../../utils/axios';

export default function VerifyOTPDialog({
  isOpenDialog,
  resetPasswordEmail,
  handleOpenDialog,
  handleOpenNextDialog,
}) {
  const theme = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    if (resetPasswordEmail === '' && isOpenDialog)
      router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.OTP));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordEmail]);

  const customTheme = (outerTheme) =>
    createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              fontFamily: theme.typography.fontFamily,
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '17.64px',
              letterSpacing: '-0.02em',
              borderRadius: '14px',
              border: '1px solid transparent',
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                border: '1px solid transparent',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                border: '1px solid transparent',
              },
              [`&.Mui-focused`]: {
                border: '1px solid #475569',
                boxShadow: '0px 4px 8px 0px #0000001A',
              },
              [`&:hover`]: {
                border: '1px solid #94A3B8',
                boxShadow: '0px 4px 32px 0px #00000026',
              },
            },
          },
        },
      },
    });

  const outerTheme = useTheme();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState: { isSubmitting, errors },
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (loading || success) return;
      setLoading(true);
      await axios('/users/account/checkOTP', {
        params: { email: resetPasswordEmail, otp: Object.values(data).join('') },
      });
      setLoading(false);
      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleOpenDialog();
      handleOpenNextDialog();
      setSuccess(false);
    } catch (error) {
      console.error(error);
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
        <Stack gap="32px" justifyContent="center" alignContent="center">
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography
              sx={{
                fontWeight: '300',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Please Enter the passcode sent to your Email
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '17.64px',
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
            >
              joeeinhorn@gmail.com{' '}
              <LoginCustomLink
                onClick={() => {
                  handleOpenDialog();
                  router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.OTP));
                }}
              >
                Change Email
              </LoginCustomLink>
            </Typography>
          </Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="32px">
              <Box>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4']} />
                </ThemeProvider>
                {(!!errors.code1 ||
                  !!errors.code2 ||
                  !!errors.code3 ||
                  !!errors.code4 ||
                  !!errors.code5 ||
                  !!errors.code6) && (
                  <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                    Code is required
                  </FormHelperText>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '17.64px',
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Didn’t received the passcode? <LoginCustomLink>Resend</LoginCustomLink>
                </Typography>
                <LoginButton loading={loading} type="submit">
                  {success ? 'OTP verified.' : 'Confirm'}
                </LoginButton>
              </Box>
            </Stack>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

VerifyOTPDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  resetPasswordEmail: PropTypes.string.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleOpenNextDialog: PropTypes.func.isRequired,
};
