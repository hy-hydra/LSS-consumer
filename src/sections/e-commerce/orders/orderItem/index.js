import PropTypes from 'prop-types';
import sum from 'lodash/sum';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import EmptyContent from '../../../../components/empty-content';
import Label from '../../../../components/label';
import ProductListTable from './ProductListTable';
import ProductListCard from './ProductListCard';
// redux
import { useDispatch } from '../../../../redux/store';
import { updateOrder } from '../../../../redux/slices/order';
// hook
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  checkout: PropTypes.object.isRequired,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function OrderItem({
  order,
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  // const { cart, total, discount, subtotal } = checkout;
  const dispatch = useDispatch();

  const theme = useTheme();

  const isMobile = useResponsive('down', 'sm');

  const statusText = {
    delivered: 'Delivered',
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    onway: 'On Way',
  };

  const totalItems = sum(
    order && order.order_items ? order.order_items.map((item) => item.quantity) : [0]
  );

  const totalPrice = sum(
    order && order.order_items
      ? order.order_items.map(
          (item) => item.quantity * (item.product.variants[0].inventory.price || 0)
        )
      : [0]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ mb: 3, boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)', width: '100%' }}>
          <CardHeader
            title={
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                  sx={{ width: '100%', justifyContent: { xs: 'space-between', sm: 'start' } }}
                >
                  <Typography variant="h4">Order ID: {order && order.id}</Typography>
                  <Label
                    color={order.order_status !== 'cancelled' ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ borderRadius: 20, padding: 2 }}
                  >
                    {statusText[order && order.order_status]}
                  </Label>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                    sx={{ display: { xs: 'none', md: 'flex' }, width: 'max-content' }}
                  >
                    <Typography variant="h4">${Number(totalPrice).toLocaleString()}</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Total Items:
                      <Typography
                        component="span"
                        sx={{ color: 'text.secondary', fontWeight: 700 }}
                      >
                        &nbsp;{totalItems}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{
                      borderRadius: 6,
                      fontSize: 16,
                      fontWeight: 400,
                      color: theme.palette.primary.contrastText,
                      padding: '12px 16px',
                      minWidth: '140px',
                      display: { xs: 'none', sm: 'flex' },
                    }}
                    disabled={order && order.order_status === 'cancelled'}
                    onClick={() => {
                      dispatch(updateOrder(order.id, { order_status: 'cancelled' }));
                    }}
                  >
                    Cancel Order
                  </Button>
                </Stack>
              </Stack>
            }
            subheader={
              <Stack
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                sx={{ gap: { xs: 1, sm: '12px' } }}
              >
                <Stack
                  alignItems="center"
                  gap={1}
                  sx={{
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    sx={{ justifyContent: { xs: 'space-between', sm: 'start' } }}
                  >
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Placed On:
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                      &nbsp;{order && new Date(order.created_at).toISOString().split('T')[0]}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="start"
                    width="100%"
                    sx={{ justifyContent: { xs: 'space-between', sm: 'end' } }}
                  >
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Arrive In:
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                      &nbsp;Undefined
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            }
            sx={{ pt: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 } }}
          />

          {
            // eslint-disable-next-line no-nested-ternary
            order && order.order_items && order.order_items.length > 0 ? (
              isMobile ? (
                <ProductListCard order_items={order.order_items} />
              ) : (
                <ProductListTable order_items={order.order_items} />
              )
            ) : (
              <EmptyContent
                title="Bag is empty"
                description="Look like you have no items in your shopping bag."
                img="/assets/illustrations/illustration_empty_cart.gif"
              />
            )
          }
        </Card>
      </Grid>
    </Grid>
  );
}
