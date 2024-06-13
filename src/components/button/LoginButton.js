import React from 'react';
// @mui
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function LoginButton({
  loading,
  fullWidth = true,
  children,
  sx,
  determinateSpinerColor = '#515151',
  indeterminateSpinerColor = '#FFFFFF',
  handleSubmit,
  type,
  ...props
}) {
  const theme = useTheme();

  // console.log(handleSubmit ? 'button' : 'submit');

  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      type={handleSubmit ? 'button' : 'submit'}
      {...props}
      sx={{
        paddingY: '14px',
        borderWidth: 0,
        borderRadius: '48px',
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.contrastText,
        ':hover': {
          borderWidth: 0,
          boxShadow: '0px 4px 32px 0px #00000066',
          backgroundColor: '#515151',
        },
        '&.Mui-disabled': {
          borderWidth: 0,
        },
        transition:
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ...sx,
      }}
      onClick={handleSubmit}
      disabled={loading}
    >
      {!loading ? (
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '16px',
            textAlign: 'center',
          }}
        >
          {children}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            variant="determinate"
            sx={{
              color: determinateSpinerColor,
            }}
            size="24px"
            thickness={8}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: indeterminateSpinerColor,
              animationDuration: '800ms',
              position: 'absolute',
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
                strokeDasharray: '50px, 200px',
              },
            }}
            size="24px"
            thickness={8}
          />
        </Box>
      )}
    </Button>
  );
}

LoginButton.propTypes = {
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  sx: PropTypes.any,
  determinateSpinerColor: PropTypes.string,
  type: PropTypes.string,
  indeterminateSpinerColor: PropTypes.string,
  handleSubmit: PropTypes.func,
};
