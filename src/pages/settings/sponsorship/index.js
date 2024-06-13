import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
import {
  AddSponsorDialog,
  FixSponsorDialog,
  SponsorSuccessDialog,
} from '../../../components/dialog';
import SponsorShipList from '../../../sections/settings/sponsorshipList/SponsorShipList';
// hook
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Orders() {
  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  const [isAddSponsorshipDialog, setIsAddSponsorshipDialogOpen] = React.useState(false);
  const [isFixSponsorshipDialog, setIsFixSponsorshipDialogOpen] = React.useState(false);
  const [isSponsorSuccessDialog, setSponsorSuccessDialogOpen] = React.useState(false);

  const handleAddSponsor = () => {
    setIsAddSponsorshipDialogOpen(!isAddSponsorshipDialog);
  };

  const handleFixSponsorDialog = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsFixSponsorshipDialogOpen(!isFixSponsorshipDialog);
  };

  const handleSponsorSuccessDialog = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setSponsorSuccessDialogOpen(!isSponsorSuccessDialog);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Sponsorship</title>
      </Head>
      {(isDesktopL || isDesktopN) && <SettingsNavPopover />}
      <Container sx={{ width: '100%', margin: '0px !important', padding: '0px !important' }}>
        <Box
          sx={{
            padding: { sm: '24px 64px', xs: '24px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: { lg: '876px', xs: '100%' },
            width: '100%',
          }}
        >
          <SponsorShipList handleAddSponsor={handleAddSponsor} />
        </Box>

        <AddSponsorDialog
          isOpenDialog={isAddSponsorshipDialog}
          handleOpenDialog={handleAddSponsor}
          handleNextDialogOpen={handleFixSponsorDialog}
        />
        <FixSponsorDialog
          isOpenDialog={isFixSponsorshipDialog}
          handleOpenDialog={handleFixSponsorDialog}
          handleNextDialogOpen={handleSponsorSuccessDialog}
        />
        <SponsorSuccessDialog
          isOpenDialog={isSponsorSuccessDialog}
          handleOpenDialog={handleSponsorSuccessDialog}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
