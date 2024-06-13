import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
// responsive
import useResponsive from '../../../hooks/useResponsive';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

NavAccount.propTypes = {
  nameField: PropTypes.bool,
};
// ----------------------------------------------------------------------

export default function NavAccount({ nameField }) {
  const { user } = useAuthContext();
  const theme = useTheme();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <Link component={NextLink} href={PATH_PAGE.profile.root} underline="none" color="inherit">
      <StyledRoot
        sx={{
          backgroundColor: 'transparent',
          padding: isDesktopL ? '14px 12px !important' : '0px !important',
        }}
      >
        <CustomAvatar
          src={user?.avatar_url}
          alt={user?.username}
          name={user?.username}
          sx={{
            margin: !isDesktopN ? '0px' : 'auto !important',
            width: '48px',
            height: '48px',
            boxShadow: user?.avatar_url
              ? '0 4px 8px rgb(0 0 0 / 15%)'
              : '0 4px 8px 0px rgb(0 0 0 / 61%)',
            border: user?.avatar_url ? '1.5px solid white' : '3px solid white',
            backgroundColor: user?.avatar_url ? 'white' : '#232323',
            color: user?.avatar_url ? theme.palette.primary.contrastText : 'white',
          }}
        />
        {nameField && (
          <Box sx={{ ml: 2, minWidth: 0 }}>
            <Typography
              sx={{ fontSize: '18px', fontWeight: 700, color: theme.palette.primary.contrastText }}
            >
              {user?.username}
            </Typography>
          </Box>
        )}
      </StyledRoot>
    </Link>
  );
}
