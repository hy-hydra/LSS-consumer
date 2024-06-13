import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';

export default function PaymentSuccessDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleOpenDialog();
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
              sx={{ width: '64px', height: '64px', marginInline: 'auto' }}
            />
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '36px',
                letterSpacing: '-0.01em',
                textAlign: 'center',
              }}
            >
              All set!
            </Typography>
          </Box>
          <Box
            sx={{
              gap: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'start',
            }}
          >
            <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
              Payment Information
            </Typography>
            <Box sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '400', fontSize: '16px' }}>Total Amount:</Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>$1,000</Typography>
            </Box>
            <Box sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '400', fontSize: '16px' }}>Payment Method:</Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
                Credit Card ending with **2334
              </Typography>
            </Box>
            <Box sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '400', fontSize: '16px' }}>Transaction ID:</Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>#12234567890</Typography>
            </Box>
            <Box sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Status:</Typography>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '16px',
                  color: '#0D9488',
                  textDecoration: 'underline',
                }}
              >
                Successful!
              </Typography>
            </Box>
          </Box>
          <LoginButton loading={loading} handleSubmit={handleSubmit}>
            Continue
          </LoginButton>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

PaymentSuccessDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
