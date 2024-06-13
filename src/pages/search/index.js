import { useEffect, useState } from 'react';
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
import { getUsers } from '../../redux/slices/user';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import FormProvider from '../../components/hook-form';
// sections
import { ShopTagFiltered, ShopProductList } from '../../sections/e-commerce/shop';
import ProfileFollowers from '../../sections/user/ProfileFollowers';
import CartWidget from '../../sections/e-commerce/CartWidget';
// context
import { useAuthContext } from '../../auth/useAuthContext';
import { useSettingsContext } from '../../components/settings';
import EmptyContent from '../../components/empty-content';
// ----------------------------------------------------------------------

Search.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Search() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { products, checkout, error } = useSelector((state) => state.product);
  const { searchType, searchValue } = useSelector((state) => state.search);
  const { users, userError } = useSelector((state) => state.user);
  const [hasMore, setHasMore] = useState(false);
  const [oldSearchValue, setOldSearchValue] = useState('');
  const [oldSearchType, setOldSearchType] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [page, setPage] = useState(1);
  const [usersList, setUsersList] = useState([]);

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
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  useEffect(() => {
    if (searchType === 'products') {
      if (oldSearchType === 'products' && page !== 1) {
        dispatch(getProducts(page, searchValue));
      }
      if (oldSearchType !== 'products') {
        dispatch(getProducts(1, searchValue));
      }
      setOldSearchType('products');
    }
    if (searchType === 'people') {
      if (oldSearchType === 'people' && page !== 1) {
        dispatch(getUsers(page, searchValue));
      }
      if (oldSearchType !== 'people') {
        dispatch(getUsers(1, searchValue));
      }
      setOldSearchType('people');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, searchValue, searchType, user]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchValue, searchType]);

  useEffect(() => {
    setProductsList([]);
    setUsersList([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType]);

  const handleResetFilter = () => {
    reset();
  };

  useEffect(() => {
    if (searchType === 'products') {
      if (oldSearchValue === searchValue) {
        setProductsList((oldProducts) => [...oldProducts.concat(products)]);
      } else {
        setProductsList(products);
        if (products.length === 0) {
          handleOnRowsScrollEnd();
        }
      }

      if (products.length && products.length < 5) {
        handleOnRowsScrollEnd();
      }

      setOldSearchValue(searchValue);
    } else {
      if (oldSearchValue === searchValue) {
        setUsersList((oldUsers) => [
          ...oldUsers.concat(users.filter((item) => item.id !== user.id)),
        ]);
      } else {
        setUsersList(users.filter((item) => item.id !== user.id));
        if (users.length === 0) {
          handleOnRowsScrollEnd();
        }
      }

      if (users.length && users.length < 10) {
        handleOnRowsScrollEnd();
      }

      setOldSearchValue(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, users]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    error && error.detail && setHasMore(false);
  }, [error]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    userError && userError.detail && setHasMore(false);
  }, [userError]);

  const handleOnRowsScrollEnd = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Search</title>
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
          <Stack>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{products.length}</strong>
                  &nbsp;Products found
                </Typography>

                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>
          {searchType === 'products' ? (
            <InfiniteScroll
              dataLength={productsList.length || 0}
              next={handleOnRowsScrollEnd}
              hasMore={productsList.length ? hasMore : false}
              endMessage={
                <Stack sx={{ textAlign: 'center', mt: 8, width: { xs: 'auth', lg: '572px' } }}>
                  {productsList.length === 0 ? (
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
              {productsList && productsList.length !== 0 && (
                <ShopProductList
                  products={productsList}
                  loading={!productsList.length && isDefault}
                />
              )}
            </InfiniteScroll>
          ) : (
            <InfiniteScroll
              dataLength={usersList.length || 0}
              next={handleOnRowsScrollEnd}
              hasMore={usersList.length ? hasMore : false}
              endMessage={
                <Stack sx={{ textAlign: 'center', mt: 8, width: { xs: 'auth', lg: '572px' } }}>
                  {usersList.length === 0 ? (
                    <EmptyContent
                      title="No Users for this keyword"
                      description="Look like you have no users to see for this keyword"
                      img="/assets/illustrations/illustration_empty_cart.gif"
                    />
                  ) : (
                    <>
                      <Typography fontSize={20} fontWeight={700}>
                        No more users.
                      </Typography>
                      <Typography fontSize={14} mt={1}>
                        Look like you have no more users to see.
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
                    Loading 10 More users
                  </Typography>
                  <CircularProgress color="primary" size={30} />
                </Stack>
              }
              // Let's get rid of second scroll bar
              style={{ overflow: 'unset' }}
            >
              {usersList && usersList.length !== 0 && <ProfileFollowers followers={usersList} />}
            </InfiniteScroll>
          )}

          <CartWidget totalItems={checkout.totalItems} />
        </Container>
      </FormProvider>
    </>
  );
}
