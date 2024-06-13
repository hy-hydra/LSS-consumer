import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import FormProvider from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';
import CustomLoadNewButton from '../../components/custom-load-new-button';

// eslint-disable-next-line import/no-unresolved
import { NotificationNavPopover } from '../../layouts/dashboard/subNav';
// sections
import {
  ShopTagFiltered,
  // ShopProductSort,
  ShopProductList,
  // ShopFilterDrawer,
  // ShopProductSearch,
} from '../../sections/e-commerce/shop';

// ----------------------------------------------------------------------

Notifications.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Notifications() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  // const { products, checkout } = useSelector((state) => state.product);
  const { products } = useSelector((state) => state.product);

  const [refreshLoading, setRefreshLoading] = useState(false);
  const [loadingButtonHide, setLoadingButtonHide] = useState(false);

  const onSetLoadingButtonHide = async () => {
    setLoadingButtonHide(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoadingButtonHide(false);
  };

  const refresh = async () => {
    setRefreshLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSetLoadingButtonHide();
    setRefreshLoading(false);
  };

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const values = watch();

  const dataFiltered = applyFilter(products, values);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleResetFilter = () => {
    reset();
  };

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Head>
        <title>Long Story Short | Notification</title>
      </Head>
      <NotificationNavPopover />
      <FormProvider methods={methods}>
        <Container
          maxWidth={themeStretch ? false : 'lg'}
          sx={{
            width: 'fit-content',
            paddingInline: '0px !important',
            marginRight: {
              xl: 'calc(50vw - 318px) !important',
              lg: 'auto',
              md: 'auto',
            },
            filter: {
              xs: 'none',
              sm: 'none',
              md: 'opacity(0.3) blur(15px)',
              lg: 'none',
              xl: 'none',
            },
            // display: {
            //   xs: 'flex',
            //   sm: 'none',
            //   md: 'flex',
            //   lg: 'flex',
            //   xl: 'flex',
            // },
          }}
        >
          <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>
                <Notifications />
                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>

          {/* <CustomLoadNewButton
            refreshLoading={refreshLoading}
            loadingButtonHide={loadingButtonHide}
            onRefresh={refresh}
          /> */}

          <ShopProductList products={dataFiltered} loading={!products.length && isDefault} />
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'All') {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
