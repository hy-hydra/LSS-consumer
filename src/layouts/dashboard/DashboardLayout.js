import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
import { openCoolStaff } from '../../redux/slices/coolStaff';
// hooks
import useResponsive from '../../hooks/useResponsive';
import { useAuthContext } from '../../auth/useAuthContext';
// auth
import AuthGuard from '../../auth/AuthGuard';
// components
// import { useSettingsContext } from '../../components/settings';
// config
// import { NAV } from '../../config-global';
//
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
// import NavDocs from './nav/NavDocs';
import NavSideBar from './nav/NavSideBar';

// componenets
import {
  CaptchaDialog,
  ApplicationStepDialog,
  AcceptInvitationDialog,
  PaymentDialog,
  FixPaymentDialog,
  PaymentSuccessDialog,
} from '../../components/dialog';
import CoolStaff from '../../components/cool-staff/CoolStaff';
// config
import { AUTH_STATUS } from '../../config-global';

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  // const { themeLayout } = useSettingsContext();

  const { pathname } = useRouter();

  const { user } = useAuthContext();

  const dispatch = useDispatch();

  // const { open: isCoolStaffOpen } = useSelector((state) => state.coolstaff);

  const [isCaptchaDialog, setIsCaptchaDialog] = useState(true);
  const [isCompleteDialog, setIsCompleteDialog] = useState(false);
  const [isInvitationDialog, setIsInvitationDialog] = useState(false);
  const [isPaymentDialog, setIsPaymentDialog] = useState(false);
  const [isFixPaymentDialog, setIsFixPaymentDialog] = useState(false);
  const [isSuccessPaymentDialog, setIsSuccessPaymentDialog] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const isHomePage = pathname.includes('home');
  const isNotificationPage = pathname.includes('notifications');
  const isSearchPage = pathname.includes('search');
  const isOrderPage = pathname.includes('orders');
  const isSettingPage = pathname.includes('settings');

  useEffect(() => {
    if (isCaptchaDialog) return;

    if (user && user?.auth_status === AUTH_STATUS.PREPARED) {
      dispatch(openCoolStaff());
    } else if (
      user &&
      (user?.auth_status === AUTH_STATUS.SUBMITTED || user?.auth_status === AUTH_STATUS.DENIED)
    ) {
      setIsCompleteDialog(true);
    } else if (user && user?.auth_status === AUTH_STATUS.ACCEPTED) {
      setIsCompleteDialog(true);
      setIsInvitationDialog(true);
    } else if (user && user?.auth_status === AUTH_STATUS.USER_ACCEPTED) {
      setIsPaymentDialog(true);
    } else if (user && user?.auth_status === AUTH_STATUS.SUBSCRIBED) {
      setIsPaymentDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.auth_status, isCaptchaDialog]);

  const handleCaptchaDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsCaptchaDialog(!isCaptchaDialog);
  };

  const handleCompleteDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsCompleteDialog(!isCompleteDialog);
  };

  const handleInvitationDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsInvitationDialog(!isInvitationDialog);
  };

  const handlePaymentDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsPaymentDialog(!isPaymentDialog);
  };

  const handleFixPaymentDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsFixPaymentDialog(!isFixPaymentDialog);
  };

  const handleSuccessPaymentDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsSuccessPaymentDialog(!isSuccessPaymentDialog);
  };

  const handleOpen = () => {
    setNavOpen(true);
  };

  const handleClose = () => {
    setNavOpen(false);
  };

  let renderNavVertical;

  if (isDesktopL && !isNotificationPage) renderNavVertical = <NavVertical />;
  if (isDesktopN || isNotificationPage || isOrderPage || isSettingPage)
    renderNavVertical = <NavMini />;
  if (isTabletL || isTabletP || isMobile)
    renderNavVertical = <NavHorizontal onOpenNav={handleOpen} />;

  const renderContent = () => (
    <>
      {(isHomePage || isNotificationPage || isSearchPage || isOrderPage || isSettingPage) && (
        <Header onOpenNav={handleOpen} />
      )}
      {(isTabletL || isTabletP || isMobile) && (
        <NavSideBar openNav={navOpen} onCloseNav={handleClose} />
      )}
      <CoolStaff onOpenApplicationStepDialog={handleCompleteDialogOpen} />

      {/* Dialogs */}
      <CaptchaDialog isOpenDialog={isCaptchaDialog} handleOpenDialog={handleCaptchaDialogOpen} />
      <ApplicationStepDialog
        isOpenDialog={isCompleteDialog}
        handleOpenDialog={handleCompleteDialogOpen}
        handleOpenNextDialog={handleInvitationDialogOpen}
      />
      <AcceptInvitationDialog
        isOpenDialog={isInvitationDialog}
        handleOpenDialog={handleInvitationDialogOpen}
        handleOpenNextDialog={handlePaymentDialogOpen}
        handleOpenPreviewDialog={handleCompleteDialogOpen}
      />
      <PaymentDialog
        isOpenDialog={isPaymentDialog}
        handleOpenDialog={handlePaymentDialogOpen}
        handleOpenSuccessDialog={handleSuccessPaymentDialogOpen}
        handleOpenFailureDialog={handleFixPaymentDialogOpen}
      />
      <FixPaymentDialog
        isOpenDialog={isFixPaymentDialog}
        handleOpenDialog={handleFixPaymentDialogOpen}
        handlePaymentDialogOpen={handlePaymentDialogOpen}
      />
      <PaymentSuccessDialog
        isOpenDialog={isSuccessPaymentDialog}
        handleOpenDialog={handleSuccessPaymentDialogOpen}
      />
      <Box
        sx={{
          display: { lg: 'flex', md: 'flex' },
          displayDirection: 'flex-row',
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
  return <AuthGuard> {renderContent()} </AuthGuard>;
}
