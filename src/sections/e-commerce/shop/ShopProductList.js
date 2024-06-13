import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
import ShopProductCard from './ShopProductCard';

// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};

export default function ShopProductList({ products, loading, ...other }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(1, 1fr)',
        xl: 'repeat(1, 1fr)',
      }}
      sx={{
        marginX: {
          xs: 0,
          sm: 0,
          md: 3,
          lg: 3,
          xl: 3,
        },
      }}
      {...other}
    >
      {(loading ? [...Array(3)] : products).map((product, index) =>
        product ? (
          <ShopProductCard key={product.id} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
