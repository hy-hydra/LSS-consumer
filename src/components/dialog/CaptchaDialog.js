import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Stack, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import BaseDialog from './BaseDialog';
import { LoginButton } from '../button';
// import { useDispatch } from '../../redux/store';
// import { openCoolStaff } from '../../redux/slices/coolStaff';
import useResponsive from '../../hooks/useResponsive';
import Image from '../image/Image';

const captchaImgs = [
  '/assets/images/captchas/captcha_8.jpg',
  '/assets/images/captchas/captcha_6.jpg',
  '/assets/images/captchas/captcha_3.jpg',
  '/assets/images/captchas/captcha_9.jpg',
  '/assets/images/captchas/captcha_5.jpg',
  '/assets/images/captchas/captcha_2.jpg',
  '/assets/images/captchas/captcha_7.jpg',
  '/assets/images/captchas/captcha_1.jpg',
  '/assets/images/captchas/captcha_4.jpg',
];

export default function CaptchaDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  // const dispatch = useDispatch();

  const isMobile = useResponsive('down', 'sm');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [clickedItem, setClickedItem] = React.useState([]);

  const handleSubmit = async () => {
    if (loading || success) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleOpenDialog();
    // dispatch(openCoolStaff());
    setSuccess(false);
  };

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      width="418px"
      radius={16}
    >
      <DialogContent
        sx={{
          paddingX: '16px',
          paddingY: '16px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="16px" justifyContent="center" alignContent="center">
          <Box
            sx={{
              display: 'flex',
              backgroundColor: theme.palette.primary.contrastText,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingX: '22px',
              paddingTop: '20px',
              paddingBottom: '32px',
              flexDirection: 'column',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '27px',
                color: theme.palette.primary.light,
              }}
            >
              Prove your humanity...
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '27px',
                color: theme.palette.primary.light,
              }}
            >
              Click things you like.
            </Typography>
          </Box>
          <Box
            sx={{
              ...(isMobile ? { maxWidth: '540px' } : {}),
              display: 'grid',
              rowGap: '4px',
              columnGap: '4px',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {captchaImgs.map((img, index) => (
              <Box
                key={index}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: !clickedItem.includes(index) ? '0px' : '12px',
                }}
                onClick={() => {
                  const exist = clickedItem.indexOf(index);
                  if (exist > -1) {
                    clickedItem.splice(exist, 1);
                    setClickedItem([...clickedItem]);
                  } else setClickedItem([...clickedItem, index]);
                }}
              >
                {clickedItem.includes(index) && (
                  <Box
                    component="img"
                    src="/assets/icons/captcha/ic_check.svg"
                    sx={{
                      width: '26px',
                      height: '26px',
                      position: 'absolute',
                      zIndex: 99,
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
                <Image
                  // disabledEffect
                  alt="captcha"
                  src={img}
                  ratio="1/1"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: !clickedItem.includes(index) ? '24px' : '12px',
                    border: !clickedItem.includes(index)
                      ? 'solid 1px transparent'
                      : `solid 1px ${theme.palette.primary.contrastText}`,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    flexShrink: 0,
                  }}
                />
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
            >
              <Box
                component="img"
                sx={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#EFEFEF',
                  },
                }}
                src="/assets/icons/captcha/ic_exclamat.svg"
              />
              <Box
                component="img"
                sx={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#EFEFEF',
                  },
                }}
                src="/assets/icons/captcha/ic_headphone.svg"
              />
              <Box
                component="img"
                sx={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#EFEFEF',
                  },
                }}
                src="/assets/icons/captcha/ic_refresh.svg"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <LoginButton
                loading={loading}
                handleSubmit={handleSubmit}
                fullWidth={false}
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  // eslint-disable-next-line no-nested-ternary
                  paddingInline: loading ? '43.28px' : success ? '20.195px' : '20px',
                }}
              >
                {success ? 'Success.' : 'Continue'}
              </LoginButton>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

CaptchaDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
