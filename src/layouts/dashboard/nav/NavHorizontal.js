import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
// assets
// eslint-disable-next-line import/no-unresolved
import { LogoSingle } from '../../../components/logo';
// config
import useResponsive from '../../../hooks/useResponsive';
import { HEADER } from '../../../config-global';
// utils
import { bgBlur } from '../../../utils/cssStyles';
//
import Searchbar from '../header/Searchbar';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

NavHorizontal.propTypes = {
  onOpenNav: PropTypes.func,
};

function NavHorizontal({ onOpenNav }) {
  const theme = useTheme();

  const isMobile = useResponsive('between', 'xs', 'sm');

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          display: 'flex',
          height: isMobile ? HEADER.H_MOBILE : HEADER.H_TABLET_OFFSET,
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderBottom: `1px solid ${theme.palette.primary.light}`,
        }}
      >
        <LogoSingle sx={{ width: '41.55px', height: '48px' }} />

        <Box sx={{ display: 'flex' }}>
          <Searchbar />
          <IconButton onClick={onOpenNav} sx={{ color: 'text.primary' }}>
            <SvgColor
              src="/assets/icons/navbar/ic_hamburger.svg"
              sx={{ width: 24, height: 24, color: 'black' }}
            />
          </IconButton>
        </Box>
      </Toolbar>

      {/* <Shadow /> */}
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
