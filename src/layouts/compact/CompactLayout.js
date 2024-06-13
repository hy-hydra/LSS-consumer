import PropTypes from 'prop-types';
// @mui
import { Stack, Container } from '@mui/material';

// ----------------------------------------------------------------------

CompactLayout.propTypes = {
  children: PropTypes.node,
};

export default function CompactLayout({ children }) {
  return (
    <Container component="main">
      <Stack
        sx={{
          py: 12,
          m: 'auto',
          maxWidth: 400,
          minHeight: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}
