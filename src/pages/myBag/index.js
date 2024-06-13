import { useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  resetCart,
  getCart,
  nextStep,
  backStep,
  gotoStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  applyPaymentMethod,
  createShipping,
} from '../../redux/slices/product';
// components
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Scrollbar from '../../components/scrollbar';
import CustomScrollToBottom from '../../components/custom-scroll-to-bottom';
// sections
import {
  CheckoutCart,
  CheckoutSteps,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
  CheckoutOverview,
} from '../../sections/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Order Summary', 'Shipping Details', 'Payment Details', 'Checkout'];

// ----------------------------------------------------------------------

EcommerceCheckoutPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  const { replace } = useRouter();

  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleGotoStep = (step) => {
    dispatch(gotoStep(step));
  };

  const handleApplyDiscount = (value) => {
    if (cart.length) {
      dispatch(applyDiscount(value));
    }
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleCreateBilling = (address) => {
    dispatch(createShipping(address));
    dispatch(createBilling(address));
    dispatch(nextStep());
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const handleApplyPaymentMethod = (value) => {
    dispatch(applyPaymentMethod(value));
  };

  const handleReset = () => {
    if (completed) {
      dispatch(resetCart());
      replace(PATH_PAGE.home.root);
    }
  };

  const onGotoOrders = () => {
    if (completed) {
      replace(PATH_PAGE.orders.root);
      dispatch(resetCart());
    }
  };

  return (
    <>
      <Head>
        <title>Long Story Short | MyBag</title>
      </Head>

      <Container
        sx={{
          maxWidth: {
            xs: 'lg',
            lg: '1300px !important',
            xl: '1440px !important',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={12} overflow="hidden" padding={1}>
            <Scrollbar>
              <CheckoutSteps activeStep={activeStep} steps={STEPS} />
            </Scrollbar>
          </Grid>
        </Grid>

        <CustomScrollToBottom />

        {completed ? (
          <CheckoutOrderComplete
            open={completed}
            onReset={handleReset}
            onDownloadPDF={onGotoOrders}
          />
        ) : (
          <>
            {activeStep === 0 && (
              <CheckoutCart
                checkout={checkout}
                onNextStep={handleNextStep}
                onDeleteCart={handleDeleteCart}
                onApplyDiscount={handleApplyDiscount}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
            {activeStep === 1 && (
              <CheckoutBillingAddress
                checkout={checkout}
                onBackStep={handleBackStep}
                onCreateBilling={handleCreateBilling}
              />
            )}
            {activeStep === 2 && billing && (
              <CheckoutPayment
                checkout={checkout}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onGotoStep={handleGotoStep}
                onApplyShipping={handleApplyShipping}
                onApplyPaymentMethod={handleApplyPaymentMethod}
                onReset={handleReset}
              />
            )}
            {activeStep === 3 && (
              <CheckoutOverview
                checkout={checkout}
                onReset={handleReset}
                onDeleteCart={handleDeleteCart}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onGotoStep={handleGotoStep}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onCreateBilling={handleCreateBilling}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
