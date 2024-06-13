import PropTypes from 'prop-types';
// mui
import { Box, Typography, Stack } from '@mui/material';

const CustomLoadingData = ({ type }) => (
  <Stack justifyContent="center" alignItems="center">
    <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', maxWidth: '456px' }}>
      <Box
        component="img"
        src="/assets/loading.gif"
        style={{ width: '200px', height: '200px', marginInline: 'auto' }}
      />
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '32px',
          lineHeight: '48px',
          letterSpacing: '-0.01em',
          color: 'black',
          textAlign: 'center',
        }}
      >
        Please Wait.
      </Typography>
      <Typography
        sx={{
          fontWeight: '500',
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}
      >
        Please wait while we’re loading your {type}
      </Typography>
    </Box>
  </Stack>
);

CustomLoadingData.propTypes = {
  type: PropTypes.string,
};

export default CustomLoadingData;
