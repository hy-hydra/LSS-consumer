import React from 'react';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, DialogContent, Stack, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import BaseDialog from './BaseDialog';
import { MotionContainer } from '../animate';
import getVariant from '../animate/getVariant';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
import { LoginCustomLink } from '../link';
// data
import { mailVerifying, resendMailVerifying } from '../../services/auth';

export default function CheckMailDialog({ isOpenDialog, handleOpenDialog, uid, token }) {
  const theme = useTheme();
  const router = useRouter();
  const [count, setCount] = React.useState(0);
  const [isVerifying, setIsVerifying] = React.useState(true);
  const [isResent, setIsResent] = React.useState('fadeInLeft');
  const [isVisible, setIsVisible] = React.useState(false);

  const verifyEmail = React.useCallback(async () => {
    if (!isOpenDialog) return;
    setIsVerifying(!uid || !token);
    if (!uid || !token) return;
    try {
      const response = await mailVerifying(uid, token);
      if (response.data.user.auth_status === 1) {
        handleOpenDialog();
        router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.MAIL_VERIFIED));
      }
    } catch (error) {
      console.log('Something went wrong:', error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token, isOpenDialog]);

  const resendVerify = async () => {
    const res = await resendMailVerifying();
    const resStatus = res?.status;
    if (resStatus) {
      if (resStatus === 200) {
        setCount((preCnt) => preCnt + 1);
        setIsVisible(true);
        setIsResent('fadeInLeft');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setCount((preCnt) => preCnt - 1);
        setIsResent('fadeOutRight');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsVisible(false);
      } else {
        console.log('Something went wrong');
      }
    } else {
      console.log('Something went wrong');
    }
  };

  React.useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
          position: 'relative',
        }}
      >
        <Stack gap="24px" justifyContent="center">
          <Box
            component="img"
            src="/assets/email_sent.gif"
            sx={{
              width: '170px',
              height: '160px',
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
            {isVerifying ? 'Check your email.' : 'Verifying your email.'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}
            >
              {isVerifying ? 'We’ve sent you an email.' : 'We’re verifying your email address.'}
            </Typography>
            <Typography
              sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}
            >
              {isVerifying ? 'Click the link inside to continue' : 'Please wait a moment'}
            </Typography>
            <Animation key={count} isVisible={isVisible} isResent={isResent} content="Sent !" />
            <Typography
              sx={{
                fontWeight: '300',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                pt: '24px',
              }}
            >
              Didn’t received the Email?{' '}
              <LoginCustomLink style={{ fontSize: '16px' }} onClick={resendVerify}>
                Resend
              </LoginCustomLink>
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

CheckMailDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  uid: PropTypes.string,
  token: PropTypes.string,
};

export function Animation({ content, isVisible, isResent }) {
  return (
    <Paper
      sx={{
        height: 60,
        width: '80% !important',
        position: 'absolute',
        top: '50%',
        left: '10%',
        background: 'white',
        display: 'flex',
        opacity: isVisible ? 1 : 0,
        transition: '2s ease',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: '200',
        fontSize: '16px',
      }}
    >
      <MotionContainer component={m.h1} sx={{ typography: 'body', display: 'flex' }}>
        {content.split('').map((letter, index) => (
          <m.span key={index} variants={getVariant(isResent)}>
            {letter}
          </m.span>
        ))}
      </MotionContainer>
    </Paper>
  );
}

Animation.propTypes = {
  content: PropTypes.string.isRequired,
  isResent: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
