import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// route
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
// hook
import useResponsive from '../../../hooks/useResponsive';
import LikedItemList from '../../../sections/settings/likedItemList/LikedItemList';
// section
import CartWidget from '../../../sections/e-commerce/CartWidget';
import EmptyContent from '../../../components/empty-content';
// context
import { useAuthContext } from '../../../auth/useAuthContext';
// ----------------------------------------------------------------------

LikedItem.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LikedItem() {
  const { user } = useAuthContext();
  const { checkout } = useSelector((state) => state.product);

  const likes = user?.likes.map((like) => like.product);

  const isEmpty = !user.likes.length;

  const handleDeleteCart = (productId) => {
    // dispatch(deleteCart(productId));
  };

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Liked Item</title>
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
            // color: theme.palette.primary.contrastText,
          }}
        >
          {!isEmpty ? (
            <LikedItemList products={likes} onDelete={handleDeleteCart} />
          ) : (
            <EmptyContent
              title="You have no liked Items"
              description="Look like you have no items in your liked item."
              goto={PATH_PAGE.home.root}
              gotoText="Get your liked items"
              img="/assets/illustrations/illustration_empty_liked_item.svg"
            />
          )}
        </Box>
      </Container>
      <CartWidget totalItems={checkout.totalItems} />
    </>
  );
}

// ----------------------------------------------------------------------
