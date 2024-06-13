import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Drawer, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config-global';
// components
import { LogoFull } from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './config-navigation';
import NavAccount from './NavAccount';
// import { CloseIcon } from '../../../theme/overrides/CustomIcons';
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

NavSideBar.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavSideBar({ openNav, onCloseNav }) {
  const { pathname } = useRouter();

  // const isDesktopL = useResponsive('up', 'xl');
  // const isDesktopN = useResponsive('between', 'lg', 'xl');
  // const isTabletL = useResponsive('between', 'md', 'lg');
  // const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <LogoFull sx={{ width: '94px', height: '96px' }} />
      </Box>
      <Stack
        spacing={3}
        sx={{
          mt: 3,
          flexShrink: 0,
        }}
      >
        <NavAccount nameField />
        <NavSectionVertical data={navConfig} />
        <Box sx={{ flexGrow: 1 }} />
      </Stack>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <Drawer
        open={openNav}
        anchor="right"
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { right: 0, width: isMobile ? '100%' : NAV.W_SIDEBAR, padding: 3 },
        }}
      >
        <IconButton
          color="inherit"
          onClick={onCloseNav}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <SvgColor
            src="/assets/icons/navbar/ic_close.svg"
            sx={{ width: 32, height: 32, color: 'black', zIndex: 999 }}
          />
        </IconButton>
        {renderContent}
      </Drawer>
    </Box>
  );
}
