import PropTypes from 'prop-types';
// @mui
import { Link, Button, Divider, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { DialogAnimate } from '../../../components/animate';
// assets
import { OrderCompleteIllustration } from '../../../assets/illustrations';

// ----------------------------------------------------------------------

CheckoutOrderComplete.propTypes = {
  open: PropTypes.bool,
  onReset: PropTypes.func,
  onDownloadPDF: PropTypes.func,
};

export default function CheckoutOrderComplete({ open, onReset, onDownloadPDF }) {
  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          marginX: { xs: '0px !important' },
          maxWidth: { md: 'calc(100% - 48px)' },
          maxHeight: { md: 'calc(100% - 48px)' },
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          m: 'auto',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Thank you for your purchase!</Typography>

        <OrderCompleteIllustration sx={{ height: 180 }} />

        <Typography variant="body2">
          Thanks for placing order
          <br />
          <br />
          <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link>
          <br />
          <br />
          We will send you a notification within 5 days when it ships.
          <br /> If you have any question or queries then fell to get in contact us. <br /> <br />
          All the best,
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={2} justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }}>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onReset}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            Continue Shopping
          </Button>

          <Button
            fullWidth
            size="large"
            variant="contained"
            // startIcon={<Iconify icon="ant-design:file-pdf-filled" />}
            onClick={onDownloadPDF}
            sx={{
              backgroundColor: '#0F172A',
              color: 'white',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            Go to Order List
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
