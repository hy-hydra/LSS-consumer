import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useCountdown from '../../hooks/useCountdown';
import useResponsive from '../../hooks/useResponsive';
// auth
// import { useAuthContext } from '../../auth/useAuthContext';
// components
import BaseDialog from './BaseDialog';
import { LoginButton } from '../button';
import { ACCEPT_INVIT_DIALOG } from '../../config-global';
// api
import { userUpdate } from '../../services/user';

// ----------------------------------------------------------------------

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function TimeBlock({ label, value }) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: label === 'Hours' ? '800' : '200',
          fontSize: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: 'rgb(33 33 33 / 24%) 0px 2px 20px 0px !important',
          width: { xl: '96px', lg: '72px', md: '72px', sm: '72px', xs: '72px' },
          height: { xl: '96px', lg: '72px', md: '72px', sm: '72px', xs: '72px' },
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          ...(label !== 'Hours' ? { color: '#475569' } : {}),
        }}
      >
        {' '}
        {value}{' '}
      </Typography>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '18px',
          textAlign: 'center',
          ...(label !== 'Hours' ? { color: '#475569' } : {}),
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function AcceptInvitationDialog({
  isOpenDialog,
  handleOpenDialog,
  handleOpenNextDialog,
  handleOpenPreviewDialog,
}) {
  const theme = useTheme();

  // const { user } = useAuthContext();

  const { hours, minutes, seconds } = useCountdown(new Date().setDate(new Date().getDate() + 3));

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    if (loading || success) return;
    try {
      setLoading(true);
      await userUpdate({ auth_status: 8 });
      setLoading(false);
      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleOpenDialog();
      handleOpenNextDialog();
      handleOpenPreviewDialog();
      setSuccess(false);
    } catch (error) {
      console.log('something went wrong:', error);
    }
  };

  const getDialogWidth = () => {
    if (isDesktopL || isDesktopN) return '552px';
    return '358px';
  };

  const getDialogHeight = () => {
    if (isDesktopL || isDesktopN) return '592px';
    return '424.94px';
  };

  const getPaddingBottom = () => {
    if (isMobile) return 0;
    if (isTabletP) return ACCEPT_INVIT_DIALOG.SM_PADDING_BOTTOM;
    if (isTabletL) return ACCEPT_INVIT_DIALOG.MD_PADDING_BOTTOM;
    if (isDesktopN) return ACCEPT_INVIT_DIALOG.LG_PADDING_BOTTOM;
    return ACCEPT_INVIT_DIALOG.LG_PADDING_BOTTOM;
  };

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      width={getDialogWidth()}
      height={getDialogHeight()}
      hideBackdrop
      sx={{ paddingBottom: `${getPaddingBottom()}px`, minWidth: '350px', minHeight: '400px' }}
    >
      <DialogContent
        sx={{
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: { lg: '33px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xl: '37px', lg: '37px', md: '37px', sm: '37px', xs: '12px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{ fontWeight: '500', fontSize: '14px', lineHeight: '21px', color: '#475569' }}
              >
                Greetings
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '30px',
                  color: theme.palette.primary.contrastText,
                }}
              >
                Joe Einhorn
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day&display=swap"
                rel="stylesheet"
              />
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: isDesktopL || isDesktopN ? '46px' : '32px',
                  fontFamily: 'Dawning of a New Day',
                  color: '#115E59',
                }}
              >
                You’re Invited to Join
              </Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '21px', lineHeight: '28.35px' }}>
                Long Story Short
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px' }}>
              The offer will expire in
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile || isTabletP || isTabletL ? '20px' : '27px',
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              divider={
                <Box sx={{ mx: { xl: '8px', lg: '8px', md: '6px', sm: '6px', xs: '6px' } }} />
              }
              sx={{ typography: 'h2' }}
            >
              <TimeBlock label="Hours" value={hours} />

              <TimeBlock label="Minutes" value={minutes} />

              <TimeBlock label="Seconds" value={seconds} />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoginButton
                loading={loading}
                handleSubmit={handleSubmit}
                fullWidth={false}
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  // eslint-disable-next-line no-nested-ternary
                  paddingInline: loading ? '73px' : success ? '49.914px' : '20px',
                }}
              >
                {success ? 'Success.' : 'Accept Invitation'}
              </LoginButton>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </BaseDialog>
  );
}

AcceptInvitationDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleOpenNextDialog: PropTypes.func.isRequired,
  handleOpenPreviewDialog: PropTypes.func.isRequired,
};
