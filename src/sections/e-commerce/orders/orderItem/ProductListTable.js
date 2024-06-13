import PropTypes from 'prop-types';
// @mui
import { Divider, Table, TableBody, TableContainer } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';
//
import ProductTableRow from './ProductTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'shippingMethod', label: 'Shipping Method' },
  { id: 'price', label: 'Price Per Unit' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalPrice', label: 'Total Price' },
];

// ----------------------------------------------------------------------

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  order_items: PropTypes.array.isRequired,
};

export default function ProductListTable({ products, order_items }) {
  return (
    <TableContainer sx={{ overflow: 'unset', p: 2 }}>
      <Divider sx={{ mx: 2, my: 1 }} />
      <Scrollbar>
        <Table sx={{ minWidth: 720, width: '100%' }}>
          <TableHeadCustom
            headLabel={TABLE_HEAD}
            sx={{ '& .MuiTableCell-root': { background: 'transparent', pb: 0.5 } }}
          />

          <TableBody>
            {order_items && order_items.map((row) => <ProductTableRow key={row.id} row={row} />)}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
