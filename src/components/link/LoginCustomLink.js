import React from 'react';
// @mui
import { Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function LoginCustomLink({ children, onClick, ...props }) {
  return (
    <Link
      {...props}
      sx={{
        cursor: 'pointer',
        textDecorationLine: 'underline',
        color: '#14B8A6',
        ':visited': {
          color: '#065F46',
        },
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '21px',
        letterSpacing: '-0.01em',
        textAlign: 'center',
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

LoginCustomLink.propTypes = {
  props: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
