// next
import { useRouter } from 'next/router';
// proptype
import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER, NAV, SUB_NAV } from '../../config-global';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

const SPACING = 8;

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext();
  const { pathname } = useRouter();
  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const isNotificationPage = pathname.includes('notifications');
  const isProfilePage = pathname.includes('profile');
  const isMyBagPage = pathname.includes('myBag');
  const isOrderPage = pathname.includes('orders');
  const isSettingPage = pathname.includes('settings');

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktopL && {
            px: 2,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktopL && {
          px: 4,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
          ...(isProfilePage && {
            py: 6,
            width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          }),
          ...(isMyBagPage && {
            pt: 12,
            width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          }),
        }),
        ...(isDesktopN && {
          pl: `${NAV.W_DASHBOARD_MINI + 32}px`,
          pr: 4,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          ...(isProfilePage && {
            py: 6,
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
          ...(isMyBagPage && { pt: 12, width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)` }),
        }),
        ...(isTabletL && {
          px: 4,
          py: `${HEADER.H_TABLET_OFFSET + HEADER.H_TABLET + 1}px`,
          ...(isProfilePage && {
            px: 6,
            py: `${HEADER.H_TABLET_OFFSET + 40}px`,
          }),
          ...(isMyBagPage && { pt: 12, px: 0, width: `calc(100% - ${NAV.W_DASHBOARD}px)` }),
          ...((isOrderPage || isSettingPage) && {
            pt: `${HEADER.H_TABLET_OFFSET + HEADER.H_TABLET + 1}px`,
            px: 0,
          }),
        }),
        ...(isTabletP && {
          py: `${HEADER.H_TABLET_OFFSET + HEADER.H_TABLET}px`,
          ...(isProfilePage && {
            px: 6,
            py: `${HEADER.H_TABLET_OFFSET + 40}px`,
          }),
          ...(isMyBagPage && {
            pt: 12,
          }),
          ...((isOrderPage || isSettingPage) && {
            pt: `${HEADER.H_TABLET_OFFSET + HEADER.H_TABLET + 1}px`,
            px: 0,
          }),
        }),
        ...(isMobile && {
          px: 0,
          py: `${HEADER.H_MOBILE_OFFSET + HEADER.H_MOBILE}px`,
          ...(isProfilePage && {
            px: 2,
            py: `${HEADER.H_TABLET_OFFSET + 16}px`,
          }),
          ...((isOrderPage || isSettingPage) && {
            pt: `${HEADER.H_TABLET_OFFSET + HEADER.H_MOBILE + 1}px`,
            px: 0,
          }),
        }),
        ...(((isNotificationPage && isDesktopN) || (isNotificationPage && isDesktopL)) && {
          pl: `${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px !important`,
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px)`,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
        }),
        ...((((isOrderPage || isSettingPage) && isDesktopN) ||
          ((isOrderPage || isSettingPage) && isDesktopL)) && {
          pl: `${NAV.W_DASHBOARD_MINI + SUB_NAV.W_ORDER}px !important`,
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_ORDER}px)`,
          pt: `${HEADER.H_DASHBOARD_DESKTOP}px`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
