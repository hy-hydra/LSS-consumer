// @mui
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
// utils
import { NAV } from '../../../config-global';
import { orderSubNavConfig } from '../nav/config-navigation';
// components
import { NavSectionSubVertical } from '../../../components/nav-section';

// ----------------------------------------------------------------------

export default function OrderNavPopover() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '0 !important',
        left: {
          xl: `${NAV.W_DASHBOARD_MINI}px !important`,
          lg: `${NAV.W_DASHBOARD_MINI}px !important`,
          md: '0px',
          sm: '0px',
          xs: '0px',
        },
        width: { md: 360, xs: '100%' },
        height: '100% !important',
        maxHeight: '100%',
        pt: { lg: 14.5, sm: 12, xs: 10.25 },
        px: { md: 0, sm: 16, xs: 0 },
        borderRadius: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        zIndex: 999,
        background: theme.palette.grey[0],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pt: { xl: '16px', lg: '11px', xs: '0px' },
          pb: 6,
          px: { md: 3, sm: 0, xs: 3 },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={theme.palette.primary.contrastText}
            sx={{ fontSize: { xs: 20, sm: 20, md: 20, lg: 24, xl: 24 } }}
          >
            Orders
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: { md: 3, sm: 0, xs: 3 } }}>
        <NavSectionSubVertical data={orderSubNavConfig} />
      </Box>
    </Stack>
  );
}
