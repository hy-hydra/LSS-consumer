import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// next
import { useRouter } from 'next/router';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { AppBar, Typography, Toolbar } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV, SUB_NAV } from '../../../config-global';
// redux
import { getCategories, setSelectedCategory } from '../../../redux/slices/product';
// components
import { CustomSelection } from '../../../components/custom-selection';
import { CustomToogleSearchbar } from '../../../components/custom-toogle-searchbar';
import { settingSubNavConfig, orderSubNavConfig } from '../nav/config-navigation';

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { pathname } = useRouter();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const isNotificationPage = pathname.includes('notifications');
  const isHomePage = pathname.includes('home');
  const isSearchPage = pathname.includes('search');
  const isOrderPage = pathname.includes('orders');
  const isSettingsPage = pathname.includes('settings');

  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    if (isNotificationPage || isHomePage) {
      dispatch(getCategories());
    }
  }, [dispatch, isHomePage, isNotificationPage]);

  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  };

  const renderContent = (
    <>
      {(isNotificationPage || isHomePage) && (
        <CustomSelection isCategory selectionList={categories} onSelect={handleCategorySelect} />
      )}
      {isSearchPage && <CustomToogleSearchbar />}
      {isOrderPage && (isDesktopL || isDesktopN) && (
        <Typography
          sx={{
            fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
            fontWeight: 600,
            color: theme.palette.primary.contrastText,
          }}
        >
          {ParseOrderPageTitle()}
        </Typography>
      )}
      {isSettingsPage && (isDesktopL || isDesktopN) && (
        <Typography
          sx={{
            fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
            fontWeight: 600,
            color: theme.palette.primary.contrastText,
          }}
        >
          {ParseSettingsPageTitle()}
        </Typography>
      )}
      {isOrderPage && (isTabletL || isTabletP || isMobile) && (
        <CustomSelection isCategory={false} selectionList={orderSubNavConfig[0].items} />
      )}
      {isSettingsPage && (isTabletL || isTabletP || isMobile) && (
        <CustomSelection isCategory={false} selectionList={settingSubNavConfig[0].items} />
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktopL && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...((isNotificationPage || isOrderPage || isSettingsPage) && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px)`,
          }),
          ...(isSearchPage && {
            width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          }),
        }),
        ...(isDesktopN && {
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...((isNotificationPage || isOrderPage || isSettingsPage) && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px)`,
          }),
        }),
        ...((isTabletL || isTabletP) && {
          height: HEADER.H_TABLET,
          top: HEADER.H_TABLET_OFFSET,
          ...bgBlur({
            color: alpha(theme.palette.background.default, 1),
          }),
          ...(isNotificationPage && {
            display: 'none',
          }),
        }),
        ...(isMobile && {
          height: `(${HEADER.H_TABLET - 5}px)`,
          justifyContent: 'center',
          top: HEADER.H_MOBILE_OFFSET,
          ...bgBlur({
            color: alpha(theme.palette.background.default, 1),
          }),
          ...(isNotificationPage && {
            display: 'none',
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 4 },
          py: { lg: '20px' },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// ------------------------------------------------------------

function ParseOrderPageTitle() {
  const { pathname } = useRouter();

  return orderSubNavConfig[0].items.filter((item) => pathname.includes(item.path))[0]?.title;
}

function ParseSettingsPageTitle() {
  const { pathname } = useRouter();

  return settingSubNavConfig[0].items.filter((item) => pathname.includes(item.path))[0]?.title;
}
