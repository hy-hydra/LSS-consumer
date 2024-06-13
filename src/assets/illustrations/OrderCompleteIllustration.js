import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import BackgroundIllustration from './BackgroundIllustration';

// ----------------------------------------------------------------------

function OrderCompleteIllustration({ ...other }) {
  return (
    <Box {...other}>
      <svg width="100%" height="100%" viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
        <BackgroundIllustration />

        <image href="/assets/illustrations/purchase_success.svg" height="420" x="-60" y="-30" />
      </svg>
    </Box>
  );
}

export default memo(OrderCompleteIllustration);
