import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Stack, useTheme } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Typography, Divider, Card, CardHeader, CardContent } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// hook
import useResponsive from '../../../hooks/useResponsive';
// coomponents
import SponsorList from '../../../components/sponsor/sponsor-list';

// ----------------------------------------------------------------------

SponsorShipList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

SponsorShipList.propTypes = {
  handleAddSponsor: PropTypes.func,
};

const SPONSOR_LIST = [
  {
    id: 1,
    userAvatar: '/assets/images/avatars/humans/human_2.png',
    userName: 'Jara Jagoreba',
    status: 0,
    paymentStatus: 3,
  },
  {
    id: 2,
    userAvatar: '/assets/images/avatars/humans/human_3.png',
    userName: 'Maria Franci',
    status: 1,
    products: 450,
    paymentStatus: 1,
  },
  {
    id: 3,
    userAvatar: '/assets/images/avatars/humans/human_4.png',
    userName: 'Zain Bergson',
    status: 1,
    products: 150,
    paymentStatus: 0,
  },
];

export default function SponsorShipList({ handleAddSponsor }) {
  const theme = useTheme();
  const isMobile = useResponsive('between', 'xs', 'sm');

  return (
    <Card
      sx={{
        boxShadow: 'none',
        maxWidth: { xl: '876px', lg: '876px', md: '100%', sm: '696px', xs: '100%' },
      }}
    >
      <CardHeader
        title={
          <Typography sx={{ fontWeight: '600', fontSize: '20px' }}>People you sponsor</Typography>
        }
        subheader={
          <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
            You can sponsor your friends & relatives to join Long Story Short
          </Typography>
        }
        action={
          <LoadingButton
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              fontWeight: '400',
              fontSize: '14px',
              color: '#FFFFFF',
              borderRadius: 6,
              py: '14px',
              width: { xs: '100%' },
            }}
            onClick={handleAddSponsor}
          >
            Add Sponsorship
          </LoadingButton>
        }
        sx={{
          padding: '0px',
          pb: '24px',
          flexDirection: { xs: 'column', sm: 'row' },
          '& .MuiCardHeader-action': {
            margin: 0,
          },
          ...(isMobile
            ? {
                gap: '16px',
                '& .MuiCardHeader-action': {
                  width: '100%',
                },
              }
            : {}),
        }}
      />

      <Divider />

      <CardContent sx={{ padding: '0px', pt: '24px' }}>
        {SPONSOR_LIST.length === 0 && (
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            New beneficiaries that you sponsor will be displayed here.
          </Typography>
        )}
        <Stack>
          {SPONSOR_LIST.map((row) => (
            <SponsorList key={row.id} row={row} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------
