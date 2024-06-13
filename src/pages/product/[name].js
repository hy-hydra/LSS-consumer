import { useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Grid, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addToCart, gotoStep } from '../../redux/slices/product';
// routes
// import { PATH_PAGE } from '../../../routes/paths';
// hook
import useResponsive from '../../hooks/useResponsive';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { SkeletonProductDetails } from '../../components/skeleton';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsLightBox,
  ProductDetailsCarousel,
} from '../../sections/e-commerce/details';
import CartWidget from '../../sections/e-commerce/CartWidget';

// ----------------------------------------------------------------------

// const SUMMARY = [
//   {
//     title: '100% Original',
//     description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
//     icon: 'ic:round-verified',
//   },
//   {
//     title: '10 Day Replacement',
//     description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
//     icon: 'eva:clock-fill',
//   },
//   {
//     title: 'Year Warranty',
//     description: 'Cotton candy gingerbread cake I love sugar sweet.',
//     icon: 'ic:round-verified-user',
//   },
// ];

// ----------------------------------------------------------------------

EcommerceProductDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const dispatch = useDispatch();

  const { product, isLoading, checkout } = useSelector((state) => state.product);
  // const [currentTab, setCurrentTab] = useState('description');

  const isMobile = useResponsive('down', 'sm');

  useEffect(() => {
    if (name) {
      dispatch(getProduct(name));
    }
  }, [dispatch, name]);

  const handleAddCart = (newProduct) => {
    dispatch(addToCart(newProduct));
  };

  const handleGotoStep = (step) => {
    dispatch(gotoStep(step));
  };

  return (
    <>
      <Head>
        <title>Long Story Short: | Product Detail</title>
      </Head>

      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{
          width: '100%',
          paddingInline: { sm: '0px !important', xs: '0px !important', md: 'auto' },
          marginInline: 'auto',
        }}
      >
        {product && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
              {isMobile ? (
                <ProductDetailsCarousel product={product} />
              ) : (
                <ProductDetailsLightBox product={product} />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
              <ProductDetailsSummary
                product={product}
                cart={checkout.cart}
                onAddCart={handleAddCart}
                onGotoStep={handleGotoStep}
                sx={{ px: '32px !important' }}
              />
            </Grid>
          </Grid>
        )}

        {isLoading && <SkeletonProductDetails />}
        <CartWidget totalItems={checkout.totalItems} />
      </Container>
    </>
  );
}
