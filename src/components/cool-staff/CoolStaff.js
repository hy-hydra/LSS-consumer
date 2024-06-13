import PropTypes from 'prop-types';
import React from 'react';
// @mui
import { Box, Typography } from '@mui/material';
import { LoginButton } from '../button';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { closeCoolStaff } from '../../redux/slices/coolStaff';
// api
import { userUpdate } from '../../services/user';

export default function CoolStaff({ onOpenApplicationStepDialog }) {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.coolstaff);

  const [loading, setLoading] = React.useState(false);
  // const [isApplicationDlgOpen, setApplicationDlgOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await userUpdate({ auth_status: 5 });
      dispatch(closeCoolStaff());
      onOpenApplicationStepDialog();
      setLoading(false);
    } catch (error) {
      console.log('something went wrong:', error);
    }
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            flexDirection: 'column',
            gap: '24px',
            background: '#00000080',
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              borderRadius: '80px',
              width: '72px',
              height: '72px',
              background: '#FFFFFF33',
              padding: '16px',
            }}
          >
            <Box component="img" src="/assets/icons/products/ic_disabledeye.svg" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '32px',
                lineHeight: '44.8px',
                letterSpacing: '0.02em',
                textAlign: 'center',
                textWrap: 'nowrap',
              }}
            >
              Cool Stuff Ahead
            </Typography>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                textWrap: 'nowrap',
              }}
            >
              Some people may find this site addictive!{' '}
            </Typography>
          </Box>
          <LoginButton
            fullWidth={false}
            loading={loading}
            determinateSpinerColor="#E2E8F0"
            indeterminateSpinerColor="#0F172A"
            sx={{
              paddingY: '14px',
              paddingX: loading ? '166px' : '104.5px',
              background: '#10B981',
              ':hover': {
                background: '#059669',
                borderWidth: 0,
                boxShadow: '0px 4px 32px 0px #00000066',
              },
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              textAlign: 'left',
            }}
            handleSubmit={handleSubmit}
          >
            Submit Application
          </LoginButton>
        </Box>
      )}
    </>
  );
}

CoolStaff.propTypes = {
  onOpenApplicationStepDialog: PropTypes.func,
};
