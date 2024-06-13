import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';

export default function EmailVerifiedDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleOpenDialog();
    await router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.UPLOAD_PHOTO));
    setLoading(false);
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
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <Box
              component="img"
              src="/assets/success.gif"
              style={{ width: '112px', height: '112px', marginInline: 'auto' }}
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
              Email Verified!
            </Typography>
          </Box>
          <LoginButton loading={loading} handleSubmit={handleSubmit}>
            Continue
          </LoginButton>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

EmailVerifiedDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
