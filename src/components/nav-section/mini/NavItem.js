import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Tooltip, Link, Box } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
//
import Iconify from '../../iconify';
import { StyledItem, StyledIcon } from './styles';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

const NavItem = forwardRef(({ item, depth, open, active, isExternalLink, ...other }, ref) => {
  const { translate } = useLocales();

  const router = useRouter();

  const { path, icon_active, icon_deactive, info, children, disabled, caption, roles, title } =
    item;

  const { logout } = useAuthContext();

  const renderContent = (
    <StyledItem ref={ref} open={open} depth={depth} active={active} disabled={disabled} {...other}>
      {active
        ? icon_active && <StyledIcon>{icon_active}</StyledIcon>
        : icon_deactive && <StyledIcon>{icon_deactive}</StyledIcon>}

      {caption && (
        <Tooltip title={`${translate(caption)}`} arrow placement="right">
          <Iconify
            icon="eva:info-outline"
            width={16}
            sx={{
              top: 11,
              left: 6,
              position: 'absolute',
            }}
          />
        </Tooltip>
      )}

      {info && (
        <Box
          component="span"
          sx={{
            lineHeight: 0,
            position: 'absolute',
            top: '24px',
            left: '24px',
          }}
        >
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon="eva:chevron-right-fill"
          sx={{
            top: 11,
            right: 6,
            position: 'absolute',
          }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Log Out Link
    if (title === 'Log Out') {
      return (
        <Link
          underline="none"
          onClick={() => {
            router.push(path);
            logout();
          }}
        >
          {renderContent}
        </Link>
      );
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
});

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default NavItem;
