import PropTypes from 'prop-types';
// @mui
import { Table, TableBody, TableContainer } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';
//
import Product from './Product';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalPrice', label: 'Total Price', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

ProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array.isRequired,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function ProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {products &&
              products.map((row) => (
                <Product
                  key={row.id}
                  row={row}
                  onDelete={() => onDelete(row.id)}
                  onDecrease={() => onDecreaseQuantity(row.id)}
                  onIncrease={() => onIncreaseQuantity(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
