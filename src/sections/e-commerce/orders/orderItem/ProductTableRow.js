import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/image';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
};

export default function ProductTableRow({ row }) {
  const { product, quantity } = row;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={product && [...product.variants[0].media].sort((a, b) => a.index - b.index)[0].url}
          sx={{ width: 64, height: 64, borderRadius: 2.5, mr: 2 }}
        />

        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
          {product && product.name}
        </Typography>
      </TableCell>

      <TableCell>Pick Up</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>
        {fCurrency((product && product.variants[0].inventory.price) || '0')}
      </TableCell>

      <TableCell sx={{ fontWeight: 700 }}>{quantity}</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>
        {row && fCurrency((Number(product.variants[0].inventory.price || 0) * quantity).toString())}
      </TableCell>
    </TableRow>
  );
}
