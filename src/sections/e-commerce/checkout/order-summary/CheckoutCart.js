import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import { useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/iconify';
import EmptyContent from '../../../../components/empty-content';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';

// ----------------------------------------------------------------------

CheckoutCart.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = !cart.length;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8.5} lg={8}>
        <Card sx={{ mb: 3, boxShadow: 'none' }}>
          <CardHeader
            title={
              <>
                <Typography variant="h6">
                  Bag Items
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                    &nbsp;({totalItems} {isEmptyCart || totalItems === 1 ? 'item' : 'items'})
                  </Typography>
                </Typography>
                <Typography variant="body2">Items that you’ve added to your Bag</Typography>
              </>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <CheckoutCartProductList
              products={cart}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Bag is empty"
              description="Look like you have no items in your shopping bag."
              goto={PATH_PAGE.home.root}
              gotoText="Go to Shopping Page"
              img="/assets/illustrations/illustration_empty_cart.gif"
            />
          )}
        </Card>

        <Button
          component={NextLink}
          href={PATH_PAGE.home.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ borderRadius: 20, padding: '10px 16px' }}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={3.5} lg={4}>
        <Stack spacing={4}>
          <CheckoutSummary
            enableDiscount
            total={total}
            discount={discount}
            subtotal={subtotal}
            onApplyDiscount={onApplyDiscount}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={!cart.length}
            onClick={onNextStep}
            sx={{
              backgroundColor: '#0F172A',
              color: 'white',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            Confirm shipping details.
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
