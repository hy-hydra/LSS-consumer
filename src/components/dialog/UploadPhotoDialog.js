import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import BaseDialog from './BaseDialog';
import { CustomAvatar } from '../custom-avatar';
import { LoginButton } from '../button';
import { UploadBox } from '../upload';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// data
import { userUpdate } from '../../services/user';
import CustomCameraCapture from '../custom-camera-capture';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// hook
import useResponsive from '../../hooks/useResponsive';

export default function UploadPhotoDialog({ isOpenDialog, handleOpenDialog }) {
  const { user } = useAuthContext();
  const theme = useTheme();
  const router = useRouter();

  const isMobile = useResponsive('down', 'sm');

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isCameraScreen, setIsCameraScreen] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleDropSingleFile = React.useCallback(async (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const handleCapturedImage = (image) => {
    handleCancel();
    const content = image[0].split(',')[1];
    const byteString = atob(content);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const newFile = new File([blob], `avatar-${Date.now()}.jpeg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    // This step is important. You should create the Object URL from the blob, not the File object
    const filePreview = URL.createObjectURL(blob);

    // Update the file state with the newFile and the preview
    setFile({
      ...newFile,
      preview: filePreview,
    });
  };

  const handleSubmit = async () => {
    if (loading || success) return;
    if (!file) {
      console.log('Please choose profile picture first');
      return;
    }
    try {
      setLoading(true);
      await userUpdate({ file });
      await userUpdate({ auth_status: 2 });
      setLoading(false);

      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      handleOpenDialog();
      await router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.UPLOAD_ID_FRONT));
      setSuccess(false);
    } catch (error) {
      console.log('something went wrong: ', error);
    }
  };

  const handleCancel = () => {
    setIsCameraScreen(false);
  };

  return (
    <BaseDialog
      fullScreen={isMobile}
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
    >
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
          display: isMobile ? 'flex' : 'auto',
        }}
      >
        <Stack
          gap="24px"
          justifyContent="center"
          alignContent="center"
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          {isCameraScreen ? (
            <CustomCameraCapture
              isAvatar
              onCancel={handleCancel}
              onCaptured={handleCapturedImage}
            />
          ) : (
            <>
              <Box
                display="flex"
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <CustomAvatar
                  name={user?.username}
                  sx={{
                    width: '100px',
                    height: '100px',
                    fontWeight: '800',
                    fontSize: '40px',
                    lineHeight: '60px',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                  }}
                  src={file?.preview}
                />
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '20px',
                    lineHeight: '30px',
                  }}
                >
                  {user?.username}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography
                  sx={{
                    fontWeight: '300',
                    fontSize: '16px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  Upload or take a new pic for your profile.
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <UploadBox
                    sx={{
                      height: '125px',
                      width: '100%',
                      margin: '0px',
                      flexShrink: '1',
                      borderRadius: '16px',
                      backgroundColor: '#FFFFFFFF',
                      borderColor: '#94A3B8',
                      color: theme.palette.primary.contrastText,
                      ':hover': {
                        color: theme.palette.primary.contrastText,
                      },
                    }}
                    placeholder={
                      <Stack sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src="/assets/icons/auth/ic_upload.svg"
                          sx={{ width: '32px', height: '32px' }}
                        />
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: '14px',
                            lineHeight: '21px',
                            textAlign: 'center',
                          }}
                        >
                          Upload a Picture
                        </Typography>
                      </Stack>
                    }
                    onDrop={handleDropSingleFile}
                  />
                  <Box
                    sx={{
                      height: '125px',
                      width: '100%',
                      flexShrink: '1',
                      borderRadius: '16px',
                      backgroundColor: '#FFFFFFFF',
                      border: 'dashed 1px #94A3B8',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      ':hover': {
                        backgroundColor: '#FFFFFFFF',
                        opacity: '0.72',
                      },
                    }}
                    onClick={() => {
                      setIsCameraScreen(true);
                    }}
                  >
                    <Stack sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src="/assets/icons/auth/ic_camera.svg"
                        sx={{ width: '32px', height: '32px' }}
                      />
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: '14px',
                          lineHeight: '21px',
                          textAlign: 'center',
                          color: theme.palette.primary.contrastText,
                        }}
                      >
                        Take a Picture
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <LoginButton loading={loading} handleSubmit={handleSubmit}>
                {success ? 'Success.' : 'Continue'}
              </LoginButton>
            </>
          )}
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

UploadPhotoDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
