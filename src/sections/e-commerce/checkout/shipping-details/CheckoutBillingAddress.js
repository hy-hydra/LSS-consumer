import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import {
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  Box,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Paper,
  CardHeader,
  Divider,
} from '@mui/material';
// _mock
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUser } from '../../../../redux/slices/user';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingInfo from '../CheckoutBillingInfo';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';
// context
import { useAuthContext } from '../../../../auth/useAuthContext';
// hook
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

CheckoutBillingAddress.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onCreateBilling }) {
  const { user } = useAuthContext();
  const { total, discount, subtotal } = checkout;

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({});

  const isMobile = useResponsive('down', 'sm');

  useEffect(() => {
    dispatch(getUser(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (currentUser.addresses && currentUser.addresses.length) {
      setAddresses(currentUser.addresses);
      setSelectedAddressId(currentUser.addresses[0].id);
      setSelectedAddress(currentUser.addresses[0]);
    }
  }, [currentUser]);

  const setBillingAddressId = (address) => {
    setSelectedAddressId(address.id);
    setSelectedAddress(address);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8.5} lg={8}>
          {!open ? (
            <>
              <Card sx={{ mb: 3, boxShadow: 'none' }}>
                <CardHeader
                  title={
                    <>
                      <Typography variant="h6">Shipping Details</Typography>
                      <Typography variant="body2">Where should we send this order?</Typography>
                    </>
                  }
                  action={
                    <Stack>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleOpen}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        sx={{
                          borderRadius: 20,
                          padding: '10px 16px',
                          ...(isMobile ? { display: 'none' } : {}),
                        }}
                      >
                        Add
                      </Button>
                    </Stack>
                  }
                  sx={{
                    mb: 3,
                    '& .MuiCardHeader-action': {
                      margin: 0,
                      alignSelf: 'center',
                    },
                  }}
                />
                <Divider sx={{ width: '100%', mb: 3 }} />
                {addresses.map((address, index) => (
                  <AddressItem
                    key={index}
                    currentAddress={address}
                    clickedAddressId={selectedAddressId}
                    onCreateBilling={() => onCreateBilling(address)}
                    onSelectBilling={() => {
                      setBillingAddressId(address);
                    }}
                  />
                ))}
              </Card>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  color="inherit"
                  onClick={onBackStep}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  sx={{ borderRadius: 20, padding: '10px 16px' }}
                >
                  Back
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleOpen}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  sx={{
                    borderRadius: 20,
                    padding: '10px 16px',
                    ...(!isMobile ? { display: 'none' } : {}),
                  }}
                >
                  Add
                </Button>
              </Stack>
            </>
          ) : (
            <CheckoutBillingNewAddressForm
              // open
              isNew
              onClose={handleClose}
              onCreateBilling={onCreateBilling}
            />
          )}
        </Grid>

        <Grid item xs={12} md={3.5} lg={4}>
          <Stack spacing={4}>
            <CheckoutBillingInfo onBackStep={onBackStep} billing={selectedAddress} />
            <CheckoutSummary
              enableEdit
              onEdit={onBackStep}
              subtotal={subtotal}
              total={total}
              discount={discount}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={selectedAddressId === ''}
              onClick={() => onCreateBilling(selectedAddress)}
              sx={{
                backgroundColor: '#0F172A',
                color: 'white',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 400,
                textTransform: 'none',
              }}
            >
              Confirm payment details.
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* <CheckoutBillingNewAddressForm
        open={open}
        isNew
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  currentAddress: PropTypes.object,
  clickedAddressId: PropTypes.string,
  onCreateBilling: PropTypes.func,
  onSelectBilling: PropTypes.func,
};

function AddressItem({ currentAddress, clickedAddressId, onCreateBilling, onSelectBilling }) {
  const { id, name, address, city, state, zip, phone, is_default } = currentAddress;

  return (
    // <Card
    //   sx={{
    //     p: 3,
    //     mb: 3,
    //     background: clickedAddressId === id && theme.palette.primary.light,
    //   }}
    // >
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        marginBottom: 3,
        borderRadius: 3,
        // eslint-disable-next-line no-shadow
        transition: (theme) => theme.transitions.create('all'),
        ...(clickedAddressId === id && {
          // eslint-disable-next-line no-shadow
          boxShadow: (theme) => theme.customShadows.z20,
        }),
      }}
    >
      <Stack
        spacing={2}
        width="100%"
        justifyContent="space-between"
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <FormControl component="fieldset">
            <RadioGroup
              defaultValue={clickedAddressId}
              value={clickedAddressId}
              onChange={onSelectBilling}
              sx={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                key={clickedAddressId}
                value={id}
                control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
                label={
                  <Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="subtitle1">
                        {name}
                        <Box
                          component="span"
                          sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}
                        >
                          (Home)
                        </Box>
                      </Typography>

                      {is_default && (
                        <Label color="info" sx={{ ml: 1 }}>
                          Default
                        </Label>
                      )}
                    </Stack>

                    <Typography variant="body2">
                      {address}, {city}, {state} / {zip}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {phone}
                    </Typography>
                  </Stack>
                }
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!is_default && (
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 1, borderRadius: 20, padding: '10px 16px' }}
            >
              Delete
            </Button>
          )}

          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 20, padding: '10px 16px' }}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
