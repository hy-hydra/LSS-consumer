import PropTypes from 'prop-types';
// @mui
import { Divider, Stack } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
//
import CheckoutCartProduct from './CheckoutCartProduct';

// ----------------------------------------------------------------------

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return (
    <Stack
      sx={{
        overflow: 'hidden',
        height: {
          // eslint-disable-next-line no-nested-ternary
          xs: products.length >= 3 ? '456px' : products.length === 2 ? '318px' : '174px',
          // eslint-disable-next-line no-nested-ternary
          sm: products.length >= 3 ? '390px' : products.length === 2 ? '264px' : '150px',
          // eslint-disable-next-line no-nested-ternary
          lg: products.length >= 3 ? '390px' : products.length === 2 ? '264px' : '150px',
        },
      }}
    >
      <Divider sx={{ width: '100%', mb: 3 }} />

      <Scrollbar>
        <Stack sx={{ minWidth: { xs: 280, sm: 280, md: 534, lg: 636, xl: 700 } }}>
          {products.map((row) => (
            <CheckoutCartProduct
              key={row.id}
              row={row}
              onDelete={() => onDelete(row.id)}
              onDecrease={() => onDecreaseQuantity(row.id)}
              onIncrease={() => onIncreaseQuantity(row.id)}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Stack>
  );
}
