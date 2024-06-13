import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

SplashLayout.propTypes = {
  children: PropTypes.node,
};

const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  background: '#C8C1B9',
}));

export default function SplashLayout({ children }) {
  return <StyledRoot>{children}</StyledRoot>;
}
