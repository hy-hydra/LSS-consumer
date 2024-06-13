import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, Tooltip, Link, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// locales
import { useLocales } from '../../../locales';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
//
import Iconify from '../../iconify';
//
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';

// ----------------------------------------------------------------------

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  hover: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default function NavItem({ item, depth, open, active, hover, isExternalLink, ...other }) {
  const { translate } = useLocales();
  const theme = useTheme();

  const ACTIVED_TEXT = theme.palette.primary.contrastText;

  const {
    title,
    path,
    icon_active,
    icon_hover,
    icon_deactive,
    info,
    children,
    disabled,
    caption,
    roles,
  } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} active={active} disabled={disabled} caption={!!caption} {...other}>
      {
        // eslint-disable-next-line no-nested-ternary
        active
          ? icon_active && <StyledIcon>{icon_active}</StyledIcon>
          : hover
          ? icon_hover && <StyledIcon>{icon_hover}</StyledIcon>
          : icon_deactive && <StyledIcon>{icon_deactive}</StyledIcon>
      }
      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}
      <ListItemText
        primary={`${translate(title)}`}
        secondary={
          caption && (
            <Tooltip title={`${translate(caption)}`} placement="top-start">
              <span>{`${translate(caption)}`}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
          fontSize: 16,
          // eslint-disable-next-line no-nested-ternary
          fontWeight: active ? '700' : hover ? 500 : null,
          color: ACTIVED_TEXT,
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />
      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}
      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{ ml: 1, flexShrink: 0 }}
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

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
