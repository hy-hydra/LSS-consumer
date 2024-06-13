// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
// import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config-global';
// components
import { LogoFull } from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './config-navigation';
import NavAccount from './NavAccount';

// ----------------------------------------------------------------------

export default function NavVertical() {
  // const isDesktopL = useResponsive('up', 'xl');
  // const isDesktopN = useResponsive('between', 'lg', 'xl');
  // const isTabletL = useResponsive('between', 'md', 'lg');
  // const isTabletP = useResponsive('between', 'sm', 'md');
  // const isMobile = useResponsive('between', 'xs', 'sm');

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 0,
          pb: 6,
          px: 0,
          flexShrink: 0,
        }}
      >
        <LogoFull />
      </Stack>

      <NavSectionVertical data={navConfig} />

      <Box sx={{ flex: 1 }} />

      <NavAccount nameField />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            zIndex: 0,
            width: NAV.W_DASHBOARD,
            bgcolor: 'transparent',
            borderColor: '#CBD5E1',
            borderWidth: '1px',
            borderRightStyle: 'solid',
            padding: 3,
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
