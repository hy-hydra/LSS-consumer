import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
// components
import Iconify from '../../../../components/iconify';
import FormProvider from '../../../../components/hook-form';
import { PaymentNew } from '../../../payment';
// // context
// import { useAuthContext } from '../../../../auth/useAuthContext';
// // redux
// import { useDispatch, useSelector } from '../../../../redux/store';
// import { getUser, getPaymentMethod } from '../../../../redux/slices/user';
// import { setPaymentMethod } from '../../../../redux/slices/product';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingInfo from '../CheckoutBillingInfo';
import CheckoutPaymentInfo from '../CheckoutPaymentInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import CheckoutDelivery from './CheckoutDelivery';
// hook
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    created_at: '2023-11-07T19:05:13.739537Z',
    cvc: null,
    date: null,
    id: 0,
    is_default: true,
    is_deleted: false,
    method: 'bank',
    modified_at: '2023-11-07T19:05:03.714888Z',
    name: 'Adam',
    provider: '1231231231231232346583',
    user_id: 11,
  },
  {
    created_at: '2023-11-08T11:14:21.524444Z',
    cvc: '123',
    date: '2023-11-23T00:00:00Z',
    id: 1,
    is_default: false,
    is_deleted: false,
    method: 'card',
    modified_at: '2023-11-08T11:14:21.524459Z',
    name: 'asdasd',
    provider: '123123123123123123123',
    user_id: 11,
  },
];

const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard Shipping (free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 200,
    title: 'Express Shipping ($200)',
    description: 'Delivered on Monday, August 5',
  },
];

// ----------------------------------------------------------------------

CheckoutPayment.propTypes = {
  onReset: PropTypes.func,
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onGotoStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onOpen: PropTypes.func,
  onApplyShipping: PropTypes.func,
  onApplyPaymentMethod: PropTypes.func,
};

export default function CheckoutPayment({
  checkout,
  onReset,
  onNextStep,
  onBackStep,
  onGotoStep,
  onOpen,
  onApplyShipping,
  onApplyPaymentMethod,
}) {
  const {
    total,
    discount,
    subtotal,
    shipping,
    billing,
    shippingPrice,
    paymentMethodId,
    paymentMethods,
  } = checkout;

  const [open, setOpen] = useState(false);
  const isMobile = useResponsive('down', 'sm');

  // const { checkout } = useSelector((state) => state.product);
  const paymentMethod = paymentMethods.filter((item) => item.id === paymentMethodId)[0];

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  });

  const defaultValues = {
    delivery: shippingPrice,
    payment: paymentMethodId,
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      onNextStep();
      onReset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!open && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5} lg={8}>
            <CheckoutDelivery
              onApplyShipping={onApplyShipping}
              deliveryOptions={DELIVERY_OPTIONS}
            />
            <CheckoutPaymentMethods
              onApplyPaymentMethod={onApplyPaymentMethod}
              paymentOptions={PAYMENT_OPTIONS}
              onOpen={handleOpen}
              sx={{ my: 3 }}
            />
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
          </Grid>
          <Grid item xs={12} md={3.5} lg={4}>
            <Stack spacing={4}>
              <CheckoutPaymentInfo onBackStep={onBackStep} paymentMethod={paymentMethod} />

              <CheckoutBillingInfo enableEdit onEdit={onBackStep} billing={billing} />

              <CheckoutSummary
                enableEdit
                total={total}
                subtotal={subtotal}
                discount={discount}
                shipping={shippingPrice}
                onEdit={() => onGotoStep(0)}
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // disabled={!cart.length}
                // onClick={onNextStep}
                sx={{
                  backgroundColor: '#0F172A',
                  color: 'white',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 400,
                  textTransform: 'none',
                }}
              >
                Confirm checkout.
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
      {open && (
        <Stack width="100%" spacing={4}>
          <CheckoutPaymentInfo onBackStep={onBackStep} paymentMethod={paymentMethod} />

          <CheckoutBillingInfo enableEdit onEdit={onBackStep} billing={billing} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // disabled={!cart.length}
            // onClick={onNextStep}
            sx={{
              backgroundColor: '#0F172A',
              color: 'white',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            Confirm checkout.
          </Button>
        </Stack>
      )}
    </FormProvider>
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      {open && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5} lg={8}>
            <PaymentNew onClose={handleClose} />
          </Grid>
          <Grid item xs={12} md={3.5} lg={4}>
            {renderContent}
          </Grid>
        </Grid>
      )}
      {!open && renderContent}
    </>
  );
}
