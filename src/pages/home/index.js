import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container, Typography, Stack, CircularProgress } from '@mui/material';
// module
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hook
import FormProvider from '../../components/hook-form';
// sections
import { ShopTagFiltered, ShopProductList } from '../../sections/e-commerce/shop';
import CartWidget from '../../sections/e-commerce/CartWidget';
// context
import { useSettingsContext } from '../../components/settings';
import CustomLoadNewButton from '../../components/custom-load-new-button';
import EmptyContent from '../../components/empty-content';
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();

  const { products, checkout, error, selectedCategory } = useSelector((state) => state.product);
  const { user } = useAuthContext();

  const [refreshLoading, setRefreshLoading] = useState(false);
  const [loadingButtonHide, setLoadingButtonHide] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [oldSelectedCategory, setOldSelectedCategory] = useState(null);
  const [showProducts, setShowProducts] = useState([]);
  const [page, setPage] = useState(1);

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
    dispatch(getProducts(page, undefined, selectedCategory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, selectedCategory, user]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    if (oldSelectedCategory === selectedCategory) {
      setShowProducts((preProduct) => [...preProduct.concat(products)]);
    } else {
      setShowProducts(products);
      if (products.length === 0) {
        // setHasMore(true);
        handleOnRowsScrollEnd();
      }
    }

    if (products.length && products.length < 5) {
      handleOnRowsScrollEnd();
    }

    setOldSelectedCategory(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    error && error.detail && setHasMore(false);
  }, [error]);

  const handleResetFilter = () => {
    reset();
  };

  const handleOnRowsScrollEnd = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Home</title>
      </Head>

      <FormProvider methods={methods}>
        <Container
          maxWidth={themeStretch ? false : 'lg'}
          sx={{
            width: 'fit-content',
            paddingInline: '0px !important',
            marginRight: {
              xl: 'calc(50vw - 318px) !important',
              lg: 'calc(50vw - 318px) !important',
              md: 'auto',
            },
          }}
        >
          <Stack mx={4}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>

                <ShopTagFiltered
                  isFiltered={!isDefault}
                  loadingButtonHide={loadingButtonHide}
                  onResetFilter={handleResetFilter}
                />
              </>
            )}
          </Stack>

          {/* <CustomLoadNewButton
            refreshLoading={refreshLoading}
            loadingButtonHide={loadingButtonHide}
            onRefresh={refresh}
          /> */}

          <InfiniteScroll
            dataLength={showProducts.length || 0}
            next={handleOnRowsScrollEnd}
            hasMore={showProducts.length ? hasMore : false}
            endMessage={
              <Stack sx={{ textAlign: 'center', mt: 8, width: { xs: 'auth', lg: '572px' } }}>
                {showProducts.length === 0 ? (
                  <EmptyContent
                    title="No products for this category"
                    description="Look like you have no items to see for this category"
                    img="/assets/illustrations/illustration_empty_cart.gif"
                  />
                ) : (
                  <>
                    <Typography fontSize={20} fontWeight={700}>
                      No more products.
                    </Typography>
                    <Typography fontSize={14} mt={1}>
                      Look like you have no more items to see.
                    </Typography>
                  </>
                )}
              </Stack>
            }
            scrollThreshold={1}
            loader={
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                sx={{ mt: 10, width: { xs: 'auth', lg: '572px' } }}
              >
                <Typography fontSize={20} fontWeight={700}>
                  Loading 5 More items
                </Typography>
                <CircularProgress color="primary" size={30} />
              </Stack>
            }
            // Let's get rid of second scroll bar
            style={{ overflow: 'unset' }}
          >
            {showProducts && showProducts.length !== 0 && (
              <ShopProductList
                products={showProducts}
                loading={(!showProducts.length && isDefault) || refreshLoading}
              />
            )}
          </InfiniteScroll>

          <CartWidget totalItems={checkout.totalItems} />
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
