/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrders } from '../../redux/slices/order';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import FormProvider from '../../components/hook-form';
import { OrderNavPopover } from '../../layouts/dashboard/subNav';
import CustomLoadingData from '../../components/custom-loading-data/CustomLoadingData';
import CustomEmptyBox from '../../components/custom-empty-box/CustomEmptyBox';
// sections
import OrderItem from '../../sections/e-commerce/orders/orderItem';
// hook
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Orders() {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.order);
  const [orderLists, setOrderLists] = useState([]);

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

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrderLists(orders.filter((order) => order.order_items.length !== 0));
  }, [orders]);

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Orders - all</title>
      </Head>
      {(isDesktopL || isDesktopN) && <OrderNavPopover />}
      <FormProvider methods={methods}>
        <Container>
          {isLoading ? (
            <CustomLoadingData type="orders" />
          ) : orderLists.length > 0 ? (
            orderLists.map((order, index) => <OrderItem order={order} key={index} />)
          ) : (
            <CustomEmptyBox type="Orders" />
          )}
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------
