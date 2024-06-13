import PropTypes from 'prop-types';
// mui
import { Box, Typography, Stack } from '@mui/material';

const CustomEmptyBox = ({ type }) => (
  <Stack justifyContent="center" alignItems="center">
    <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', maxWidth: '456px' }}>
      <Box
        component="img"
        src="/assets/illustrations/illustration_empty_cart.gif"
        style={{ width: '164px', height: '164px', marginInline: 'auto' }}
      />
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '36px',
          letterSpacing: '-0.01em',
          color: 'black',
          textAlign: 'center',
        }}
      >
        Your {type} List is Empty – Let’s Fill it Up!
      </Typography>
      <Typography
        sx={{
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}
      >
        Take your time to explore our website and discover the perfect items to add to your cart.
      </Typography>
    </Box>
  </Stack>
);

CustomEmptyBox.propTypes = {
  type: PropTypes.string,
};

export default CustomEmptyBox;
