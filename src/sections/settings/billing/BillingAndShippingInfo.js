import { useState } from 'react';
// @mui
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import ShippingAddress from './ShippingAddress';
import PaymentMethods from './PaymentMethods';
import DeliveryInfo from './DeliveryInfo';
import { CheckoutBillingNewAddressForm } from '../../e-commerce/checkout';
import { PaymentNew } from '../../payment';
import axios from '../../../utils/axios';
// context
import { useAuthContext } from '../../../auth/useAuthContext';

export default function BillingAndShippingInfo() {
  const theme = useTheme();
  const { user, updateUser } = useAuthContext();

  const [isOpenShippingAddress, setIsOpenShippingAddress] = useState(false);
  const [isOpenPaymentMethod, setIsOpenPaymentMethod] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [addressData, setAddressData] = useState(undefined);

  const handleCreateBilling = async (data) => {
    try {
      await axios.post('/users/address/', {
        name: data.receiver,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zipCode,
        phone: data.phoneNumber,
        is_default: data.isDefault,
      });
      if (data.is_default)
        await Promise.all(
          user?.addresses.map(async (address) => {
            await axios.put(`/users/address/${address.id}`, {
              ...address,
              is_default: false,
            });
          })
        );
      updateUser();
      setIsOpenShippingAddress(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePaymentMethod = () => {
    setIsOpenPaymentMethod(false);
  };

  const handleClose = () => {
    setIsOpenShippingAddress(false);
    setIsOpenPaymentMethod(false);
  };

  return (
    <Box
      sx={{
        padding: { sm: '24px 64px', xs: '24px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: { xl: '784px', xs: '100%' },
        width: '100%',
        color: theme.palette.primary.contrastText,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isOpenShippingAddress || isOpenPaymentMethod ? (
            <>
              {isOpenShippingAddress && (
                <CheckoutBillingNewAddressForm
                  isNew={isNew}
                  addressData={addressData}
                  onClose={handleClose}
                  onCreateBilling={handleCreateBilling}
                />
              )}
              {isOpenPaymentMethod && (
                <PaymentNew
                  onClose={handleClose}
                  onCreatPaymentMethod={handleCreatePaymentMethod}
                />
              )}
            </>
          ) : (
            <>
              <ShippingAddress
                onOpen={(data = undefined, newAble = true) => {
                  setIsNew(newAble);
                  setAddressData(data);
                  setIsOpenShippingAddress(true);
                }}
              />
              <PaymentMethods
                onOpen={() => {
                  setIsOpenPaymentMethod(true);
                }}
              />
              <DeliveryInfo />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
