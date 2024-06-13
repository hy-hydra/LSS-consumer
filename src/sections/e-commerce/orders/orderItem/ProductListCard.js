import PropTypes from 'prop-types';
// @mui
import { Divider, Stack, Typography } from '@mui/material';
import Image from '../../../../components/image';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProductListCard.propTypes = {
  order_items: PropTypes.array.isRequired,
};

export default function ProductListCard({ order_items }) {
  return (
    <Stack>
      <Divider sx={{ mx: 2, mt: 2, mb: 1 }} />
      {order_items && order_items.map((row) => <ProductItemCard key={row.id} row={row} />)}
    </Stack>
  );
}

// ------------------------------------------------------------------------

ProductItemCard.propTypes = {
  row: PropTypes.shape({
    quantity: PropTypes.number,
    product: PropTypes.array.isRequired,
  }),
};

export function ProductItemCard({ row }) {
  const { product, quantity } = row;

  return (
    <Stack flexDirection="row" gap={2} sx={{ mx: 2, my: 2 }}>
      <Stack width={64}>
        <Image
          alt="product image"
          src={[...product.variants[0].media].sort((a, b) => a.index - b.index)[0].url}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />
      </Stack>

      <Stack flexDirection="column" gap={1}>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Product
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {product.name}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Price Per Unit
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {fCurrency(product.variants[0].inventory.price || '0')}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Quantity
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {quantity}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Shipping Method
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            Pick Up
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
