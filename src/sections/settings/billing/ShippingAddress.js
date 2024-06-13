import React from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Card,
  Button,
  Typography,
  Stack,
  Box,
  Link,
  Paper,
  CardHeader,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { LoadingButton } from '@mui/lab';
// context
import { useAuthContext } from '../../../auth/useAuthContext';
// axios
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ShippingAddress.propTypes = {
  onOpen: PropTypes.func,
};

export default function ShippingAddress({ onOpen }) {
  const theme = useTheme();
  const { user, updateUser } = useAuthContext();
  const [loading, setLoading] = React.useState(undefined);

  const handleSetDefaultShipping = async (id) => {
    setLoading(id);
    try {
      await Promise.all(
        user?.addresses.map(async (address) => {
          if (address.id === id)
            await axios.put(`/users/address/${address.id}`, {
              ...address,
              is_default: true,
            });
          else
            await axios.put(`/users/address/${address.id}`, {
              ...address,
              is_default: false,
            });
        })
      );
      updateUser();
      setLoading(undefined);
    } catch (error) {
      setLoading(undefined);
      console.error(error);
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 'none' }}>
      <CardHeader
        title={<Typography variant="h6">Shipping Details</Typography>}
        action={
          <Link
            // href={goto}
            onClick={onOpen}
            sx={{
              cursor: 'pointer',
              textDecorationLine: 'underline',
              color: theme.palette.primary.darker,
              ':hover': {
                color: theme.palette.primary.contrastText,
              },
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '40px',
              textAlign: 'center',
              mt: 1,
            }}
          >
            Add shipping address.
          </Link>
        }
        sx={{ pl: 0, mb: 3, alignItems: 'center' }}
      />
      <Divider sx={{ width: '100%', mb: 3 }} />
      {user.addresses.map((address, index) => (
        <AddressItem
          key={index}
          address={address}
          handleSetDefaultShipping={handleSetDefaultShipping}
          loading={loading}
          onOpen={onOpen}
          // clickedAddressId={selectedAddressId}
          // onCreateBilling={() => onCreateBilling(address)}
          // onSelectBilling={() => {
          //   setBillingAddressId(address);
          // }}
        />
      ))}
    </Card>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.object,
  clickedAddressId: PropTypes.string,
  onCreateBilling: PropTypes.func,
  onSelectBilling: PropTypes.func,
  handleSetDefaultShipping: PropTypes.func,
  onOpen: PropTypes.func,
  loading: PropTypes.bool,
};

function AddressItem({
  address,
  clickedAddressId,
  onCreateBilling,
  onSelectBilling,
  handleSetDefaultShipping,
  loading,
  onOpen,
}) {
  const {
    id,
    name,
    address: fullAddress,
    city,
    phone,
    state,
    zip,
    country,
    is_default: isDefault,
  } = address;

  return (
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 2.5,
        gap: 2,
        borderRadius: 3,
        marginBottom: { xs: 2, sm: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'space-between' },
        transition: (theme) => theme.transitions.create('all'),
      }}
    >
      <Stack flexGrow={1} spacing={1} width="100%">
        <Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {name}
              <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({country})
              </Box>
            </Typography>
          </Stack>

          <Typography variant="body2">
            {fullAddress} - {city}, {state} / {zip}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phone}
          </Typography>
        </Stack>
      </Stack>

      <Stack flexDirection="row" width="100%" justifyContent="end">
        {!isDefault && (
          <LoadingButton
            variant="outlined"
            loading={loading === id}
            sx={{
              color: '#0F172A',
              mr: 1,
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
            disabled={loading !== undefined && loading !== id}
            onClick={() => handleSetDefaultShipping(id)}
          >
            Set as default
          </LoadingButton>
        )}

        {isDefault && (
          <Button
            disabled
            variant="contained"
            color="primary"
            sx={{
              color: '#0F172A',
              mr: 1,
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
          >
            Default
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#0F172A',
            color: 'white',
            borderRadius: 20,
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 400,
            padding: { xs: '8px 16px', sm: '10px 16px' },
            width: { xs: '50%', sm: 'fit-content' },
          }}
          onClick={() => onOpen(address, false)}
        >
          Edit
        </Button>
      </Stack>
    </Paper>
  );
}
