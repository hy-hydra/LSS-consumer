import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
// hook
import useResponsive from '../../../hooks/useResponsive';
import UserProfileForm from '../../../sections/settings/profileForm/profileForm';

// ----------------------------------------------------------------------

Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Profile() {
  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Profile</title>
      </Head>
      {(isDesktopL || isDesktopN) && <SettingsNavPopover />}
      <Container sx={{ width: '100%', margin: '0px !important', padding: '0px !important' }}>
        <Box
          sx={{
            padding: { sm: '24px 64px', xs: '24px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: { lg: '954px', xs: '100%' },
            width: '100%',
          }}
        >
          <UserProfileForm />
        </Box>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
