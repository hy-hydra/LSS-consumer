// @mui
import { Stack, Box } from '@mui/material';
// config
import { NAV } from '../../../config-global';
// components
import { LogoSingle } from '../../../components/logo';
import { NavSectionMini } from '../../../components/nav-section';
//
import navConfig from './config-navigation';
import NavAccount from './NavAccount';

// ----------------------------------------------------------------------

export default function NavMini() {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 1, md: 1 },
        px: 3,
        py: 4,
        width: { xl: NAV.W_DASHBOARD_MINI, lg: NAV.W_DASHBOARD_MINI },
        borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        display: { xl: 'flex', lg: 'flex', md: 'flex' },
        justifyContent: 'center',
        position: 'fixed',
        minHeight: { xl: 1, lg: 1, md: 1 },
      }}
    >
      <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <LogoSingle />
        <NavSectionMini data={navConfig} />

        <Box sx={{ flexShrink: 1 }} />

        <NavAccount />
      </Stack>
    </Box>
  );
}
