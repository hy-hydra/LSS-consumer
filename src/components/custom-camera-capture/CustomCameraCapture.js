import PropTypes from 'prop-types';
// react
import React, { useState } from 'react';
// mui
import { Box, Stack, Typography } from '@mui/material';
// module
// eslint-disable-next-line import/no-extraneous-dependencies
import Webcam from 'react-webcam';
// component
import { LoginButton } from '../button';

const videoConstraints = {
  facingMode: 'user',
};

export default function CustomCameraCapture({ isAvatar, onCaptured, onCancel }) {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(undefined);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const onUsePhoto = () => {
    onCaptured([image]);
  };

  return (
    <Box>
      {!image ? (
        <Box sx={{ marginBottom: 0, height: 300, display: 'flex', justifyContent: 'center' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored
            videoConstraints={videoConstraints}
            screenshotQuality={100}
            imageSmoothing
            style={{
              border: '3px solid lightgrey',
              borderRadius: isAvatar ? '50%' : '10%',
              aspectRatio: '1/1',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      ) : (
        <Box sx={{ marginBottom: 0, height: 300, display: 'flex', justifyContent: 'center' }}>
          <img
            src={image}
            alt="test-ilustartion"
            style={{
              border: '3px solid lightgrey',
              borderRadius: isAvatar ? '50%' : '10%',
              aspectRatio: '1/1',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
      <br />
      <Typography width="100%" textAlign="center">
        {isAvatar
          ? `Face the camera straight on, keep your expression neutral, and avoid shadows for a
        clear avatar picture.`
          : `Hold your ID card steady in good lighting, making sure all text is
        visible and the photo is in focus, without any glare.`}
      </Typography>
      <br />
      <Stack flexDirection="row" gap={1}>
        <LoginButton
          handleSubmit={() => (!image ? capture() : setImage(undefined))}
          sx={{ width: '100%' }}
        >
          {!image ? 'Take photo' : 'Retake photo'}
        </LoginButton>

        <LoginButton
          handleSubmit={() => (!image ? onCancel() : onUsePhoto())}
          sx={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: 'black',
            ':hover': {
              boxShadow: '2px 4px 32px 0px #00000044',
              backgroundColor: '#d7d7d7',
              borderColor: 'transparent',
            },
          }}
        >
          {!image ? 'Cancel' : 'Use this photo'}
        </LoginButton>
      </Stack>
    </Box>
  );
}

CustomCameraCapture.propTypes = {
  isAvatar: PropTypes.bool,
  onCaptured: PropTypes.func,
  onCancel: PropTypes.func,
};
