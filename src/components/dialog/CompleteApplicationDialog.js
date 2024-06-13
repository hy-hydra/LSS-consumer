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
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// hook
import FormProvider from '../hook-form';
// api
import { userUpdate } from '../../services/user';

export const defaultValues = {
  tiktok: '',
  wiki: '',
  self: '',
};

const FormSchema = Yup.object().shape({
  tiktok: Yup.string().required('Link to your Tiktok or Instagram is required'),
  wiki: Yup.string().required('Link to your Wikipedia or Linkedin is required'),
  self: Yup.string().required('About yourself is required'),
});

export default function CompleteApplictionDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();

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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      await userUpdate({ auth_status: 4 });
      console.log('DATA', values);
      handleOpenDialog();
      await router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.SIGN_IN));
      reset();
    } catch (error) {
      console.log('something went wrong:', error);
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
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '32.4px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            Complete application
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <CustomLoginTextField
                  fullWidth
                  name="tiktok"
                  placeholder="Link to your Tiktok or Instagram"
                  prefix="https://"
                />
                <CustomLoginTextField
                  fullWidth
                  name="wiki"
                  placeholder="Link to your Wikipedia or Linkedin"
                  prefix="https://"
                />
                <CustomLoginTextField
                  fullWidth
                  name="self"
                  multiline
                  rows={5}
                  placeholder="Anything else to share about yourself goes here."
                />
              </Box>
              <LoginButton loading={isSubmitting} type="submit">
                Continue
              </LoginButton>
            </Box>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

CompleteApplictionDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
