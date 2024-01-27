import React, { useEffect } from 'react';
import { Box, Grid, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { getAllDashboard, getAllProducts, getAllUsers } from '../../../redux/actions/admin';
import { getAllOrders } from '../../../redux/actions/orderAction';
import { getAllCoupon } from '../../../redux/actions/coupon';

const Databox = ({ title, qty }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDashboard());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAllCoupon())
  }, [dispatch]);
  

  const { loading, dashboard } = useSelector(state => state.dashboard);

  // Add conditional rendering to check if dashboard data is available
  if (loading || !dashboard) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box boxSizing="border-box" py="16" px={['4', '0']}>
          <Text
            textAlign={'center'}
            opacity={'0.5'}
            children={`Today's Date ${String(new Date()).split('G')[0]}`}
          />

          <Heading
            children="Java Sports Admin Dashboard"
            ml={['0', '16']}
            py="10"
            mb="16"
            textAlign={['center', 'left']}
          />

          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <Databox
              title="Total Revenue"
              qty={`₹${dashboard.totalOrdersAmount}`}
            />
            <Databox title="Order Placed" qty={`${dashboard.ordersPlaced}`} />
            <Databox title="Order Shipped" qty={`${dashboard.orderShipped}`} />
            <Databox
              title="Order Delivered"
              qty={`${dashboard.orderDelivered}`}
            />
          </Stack>
          <Stack
            direction={['column', 'row']}
            minH="24"
            margin={'2'}
            justifyContent={'space-evenly'}
          >
            <Databox
              title="Total Cancelled"
              qty={`₹${dashboard.totalOrdersAmountCancelled}`}
            />
            <Databox
              title="Order Cancelled"
              qty={`${dashboard.orderCancelled}`}
            />
            <Databox title="Total Orders" qty={`${dashboard.TotalOrders}`} />
            <Databox title="Products" qty={`${dashboard.productsCount}`} />
          </Stack>
          <Stack
            direction={['column', 'row']}
            minH="24"
            margin={'3'}
            justifyContent={'space-evenly'}
          >
            <Databox title="Users" qty={`${dashboard.userCount}`} />
          </Stack>
        </Box>

        <Sidebar />
      </Grid>
    </>
  );
};

export default Dashboard;
