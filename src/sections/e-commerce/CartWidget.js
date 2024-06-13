import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Badge, Link } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme, totalItems }) => ({
  zIndex: 999,
  right: 0,
  display: totalItems === 0 ? 'none' : 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(30),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

CartWidget.propTypes = {
  totalItems: PropTypes.number,
};

export default function CartWidget({ totalItems }) {
  return (
    <Link component={NextLink} href={PATH_PAGE.myBag}>
      <StyledRoot totalItems={totalItems} sx={{ display: { lg: 'none' } }}>
        <Badge showZero badgeContent={totalItems} color="error" max={99}>
          <Iconify icon="solar:bag-5-bold" width={24} />
        </Badge>
      </StyledRoot>
    </Link>
  );
}
