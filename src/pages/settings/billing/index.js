import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
// hook
import useResponsive from '../../../hooks/useResponsive';
import BillingAndShippingInfo from '../../../sections/settings/billing/BillingAndShippingInfo';

// ----------------------------------------------------------------------

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Orders() {
  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Billing & Shipping Info</title>
      </Head>
      {(isDesktopL || isDesktopN) && <SettingsNavPopover />}
      <Container sx={{ width: '100%', margin: '0px !important', padding: '0px !important' }}>
        <BillingAndShippingInfo />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
