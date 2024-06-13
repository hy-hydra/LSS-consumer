import PropTypes from 'prop-types';
// mui
import { Alert, Box, IconButton, Collapse } from '@mui/material';
// icon
import { ErrorIcon, InfoIcon, SuccessIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../iconify';
// ----------------------------------------------------------------------

export default function CustomNotification({ isOpen, onClose, title, type, ...other }) {
  const icon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon />;
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return (
          <Iconify icon="fluent:warning-24-filled" sx={{ width: 24, height: 24, color: 'black' }} />
        );
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Box sx={{ width: '100%', '& .MuiPaper-rounded': { borderRadius: '16px !important' } }}>
      <Collapse in={isOpen}>
        <Alert
          icon={icon()}
          action={
            <IconButton onClick={onClose}>
              <Iconify
                icon="system-uicons:cross-circle"
                sx={{ width: 24, height: 24, color: 'black' }}
              />
            </IconButton>
          }
          sx={{
            color: 'black',
            background: '#f3f3f3',
            border: '1px dashed',
            padding: '8px 16px',
            borderColor: '#3d3d3d',
            width: '100% !important',
            borderRadius: '16px !important',
            textAlign: 'center',
            alignItems: 'center',
            fontWeight: 500,
            fontSize: { xs: 13, sm: 15 },
            '& .MuiAlert-icon': { color: 'black' },
          }}
        >
          {title}
        </Alert>
      </Collapse>
    </Box>
  );
}

CustomNotification.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};
