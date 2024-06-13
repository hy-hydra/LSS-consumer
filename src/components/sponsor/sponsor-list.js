import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/system';
import { Box, Stack, Typography, FormControlLabel, Switch } from '@mui/material';
// components
import Image from '../image';

// ----------------------------------------------------------------------

SponsorList.propTypes = {
  row: PropTypes.object,
};

export default function SponsorList({ row }) {
  const { userAvatar, userName, status, paymentStatus } = row;
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        padding: { xs: 2, sm: 0 },
        flexDirection: { xs: 'column', sm: 'row' },
        border: { xs: '1px solid #CBD5E1', sm: 'none' },
        borderRadius: { xs: '24px', sm: 'auto' },
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          alt="product image"
          src={userAvatar}
          sx={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            mr: 2,
          }}
        />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 },
            flex: 1,
          }}
        >
          <Typography
            noWrap
            variant="subtitle1"
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              maxWidth: { xs: 200, sm: 200, md: 220, lg: 260, xl: 260 },
            }}
          >
            {userName}
          </Typography>

          <Typography
            sx={{
              fontWeight: '500',
              fontSize: '12px',
              color: !status ? '#059669' : theme.palette.primary.contrastText,
            }}
          >
            {status ? `${row.products > 200 ? '200+' : row.products} Products` : 'Invitation Sent'}
          </Typography>
        </Stack>
      </Box>

      <Stack
        gap={4}
        alignItems="center"
        justifyContent="end"
        sx={{
          width: '100%',
          display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
          flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
        }}
      >
        <FormControlLabel
          control={<Switch defaultChecked={paymentStatus === 1 || paymentStatus === 3} />}
          label={
            <Typography sx={{ fontWeight: '500', fontSize: '12px' }}>
              Monthly Subscription
            </Typography>
          }
          labelPlacement="start"
        />

        <FormControlLabel
          control={<Switch defaultChecked={paymentStatus === 2 || paymentStatus === 3} />}
          label={<Typography sx={{ fontWeight: '500', fontSize: '12px' }}>Orders</Typography>}
        />
      </Stack>

      <Stack
        gap={0.5}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          display: { xs: 'flex', sm: 'none' },
          flexDirection: { xs: 'column', sm: 'column' },
        }}
      >
        <FormControlLabel
          control={<Switch defaultChecked={paymentStatus === 1 || paymentStatus === 3} />}
          label={
            <Typography sx={{ fontWeight: '500', fontSize: '12px' }}>
              Monthly Subscription
            </Typography>
          }
          labelPlacement="start"
          sx={{ width: '100%', justifyContent: 'space-between' }}
        />

        <FormControlLabel
          control={<Switch defaultChecked={paymentStatus === 2 || paymentStatus === 3} />}
          label={<Typography sx={{ fontWeight: '500', fontSize: '12px' }}>Orders</Typography>}
          labelPlacement="start"
          sx={{ width: '100%', justifyContent: 'space-between' }}
        />
      </Stack>
    </Stack>
  );
}
