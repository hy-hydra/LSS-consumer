import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
//
import LikedProductListItem from './LikedProductListItem';

// ----------------------------------------------------------------------

LikedItemList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function LikedItemList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return (
    <Stack
      sx={{
        overflow: 'hidden',
      }}
    >
      <Stack>
        {products &&
          products.map((row) => (
            <LikedProductListItem key={row.id} row={row} onDelete={() => onDelete(row.id)} />
          ))}
      </Stack>
    </Stack>
  );
}
