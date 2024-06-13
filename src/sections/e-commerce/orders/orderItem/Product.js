import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography, IconButton } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/image';
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { IncrementerButton } from '../../../../components/custom-input';

// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={row && row.cover}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {row && row.name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            Size: <Label sx={{ ml: 0.5 }}> {row && row.size} </Label>
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(row && row.price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 96, textAlign: 'right' }}>
          <IncrementerButton
            quantity={row && row.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={row && row.quantity <= 1}
            disabledIncrease={row && row.quantity >= row.available}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Available: {row && row.available}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(row && row.price * row.quantity)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
