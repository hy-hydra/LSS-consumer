import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Dialog } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function BaseDialog({
  isOpenDialog,
  handleOpenDialog,
  width,
  height,
  children,
  ...prop
}) {
  const theme = useTheme();

  return (
    <Dialog
      disableEscapeKeyDown
      {...prop}
      open={isOpenDialog}
      onClose={handleOpenDialog}
      sx={{
        '& .MuiPaper-rounded': {
          ...(prop.hideBackdrop
            ? {
                [theme.breakpoints.up('xs')]: {
                  backgroundImage: 'url("/assets/images/invite/invite_dialog_bg_xs.svg")',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                },
                [theme.breakpoints.up('sm')]: {
                  backgroundImage: 'url("/assets/images/invite/invite_dialog_bg_sm.svg")',
                },
                [theme.breakpoints.up('md')]: {
                  backgroundImage: 'url("/assets/images/invite/invite_dialog_bg_md.svg")',
                },
                [theme.breakpoints.up('lg')]: {
                  backgroundImage: 'url("/assets/images/invite/invite_dialog_bg_lg.svg")',
                },
                backgroundColor: 'transparent',
                boxShadow: 'none',
                filter: 'drop-shadow(8px 10px 12px #00000042)',
              }
            : {}),
          [theme.breakpoints.down('sm')]: {
            width: width || '100%',
            ...(width ? {} : { borderRadius: '0px !important' }),
            ...(prop.radius !== undefined && prop.radius !== null
              ? { borderRadius: `${prop.radius}px !important` }
              : {}),
            margin: '0px',
          },
          width: width || '420px',
          ...(prop.fullScreen ? { bottom: '0', position: 'absolute' } : {}),
          ...(height ? { height } : {}),
        },
        '& .MuiBackdrop-root': {
          background: 'rgb(0 0 0 / 0%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
        ...prop.sx,
      }}
    >
      {children}
    </Dialog>
  );
}

BaseDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.any,
  children: PropTypes.node,
};
