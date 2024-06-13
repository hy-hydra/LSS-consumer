import PropTypes from 'prop-types';
// mui
import { LoadingButton } from '@mui/lab';
import { Typography, Grow } from '@mui/material';
import { useTheme } from '@mui/system';
// component
import Iconify from '../iconify';
import { CustomAvatar, CustomAvatarGroup } from '../custom-avatar';
// mock
import _mock from '../../_mock';

const CustomLoadNewButton = ({ refreshLoading, onRefresh, loadingButtonHide }) => {
  const theme = useTheme();

  return (
    <Grow in={!loadingButtonHide}>
      <LoadingButton
        fullWidth
        variant="contained"
        loading={refreshLoading === true}
        startIcon={
          refreshLoading ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          ) : (
            <Iconify icon="ph:arrow-up-bold" sx={{ color: theme.palette.primary.dark }} />
          )
        }
        sx={{
          // ...(loadingButtonHide && { display: 'none' }),
          position: { xs: 'fixed', lg: 'relative' },
          top: { xs: '160px', lg: '10px' },
          left: { xs: 'calc(50vw - 60px)', lg: '5%' },
          zIndex: 999,
          width: { xs: '120px', lg: '90%' },
          mb: { xs: 0, lg: 2 },
          height: '40px',
          borderRadius: 20,
          color: theme.palette.primary.contrastText,
          background: theme.palette.primary.lighter,
          alignItems: 'center',
          gap: { xs: 0, lg: 1 },
          boxShadow: `0px 3px 20px -2px rgba(100, 116, 139, 0.2), 0px 2px 4px 0px rgba(100, 116, 139, 0.14), 0px 1px 5px 0px rgba(100, 116, 139, 0.12)`,
          ':hover': {
            background: theme.palette.primary.light,
            boxShadow: `0px 0px 17px rgb(255 255 255)`,
          },
          opacity: 1,
          transition: 'opacity 0.5s ease-in-out',
          '&.hidden': {
            opacity: 0,
          },
        }}
        onClick={onRefresh}
      >
        {refreshLoading ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{ display: { xs: 'none', lg: 'flex' }, textTransform: 'none' }}
            >
              Click here for &nbsp;<strong>new stuff!</strong>
            </Typography>
            <CustomAvatarGroup key="medium" size="tiny" max={4}>
              <CustomAvatar key={1} alt="Remy Sharp" src={_mock.image.product(1)} />
              <CustomAvatar key={2} alt="Remy Sharp" src={_mock.image.product(2)} />
              <CustomAvatar key={3} alt="Remy Sharp" src={_mock.image.product(5)} />
              <CustomAvatar key={4} alt="Remy Sharp" src={_mock.image.product(1)} />
            </CustomAvatarGroup>
          </>
        )}
      </LoadingButton>
    </Grow>
  );
};

CustomLoadNewButton.propTypes = {
  refreshLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  loadingButtonHide: PropTypes.bool,
};

export default CustomLoadNewButton;
