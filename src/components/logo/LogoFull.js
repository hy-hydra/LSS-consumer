import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const LogoFull = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  //-------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="/logo/logo_full.svg"
      sx={{ width: '125.11px', height: '128px', cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={NextLink} href="/home" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

LogoFull.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default LogoFull;
