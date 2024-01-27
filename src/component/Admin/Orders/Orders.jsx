import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../../redux/actions/orderAction';

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  const { loading, ordersCount, orders } = useSelector(
    state => state.orders.orders
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Filter orders based on search term and selected filter
  const filteredOrders = orders.filter(item => {
    const matchesSearch =
      item._id.includes(searchTerm) ||
      item.totalPrice.toString().includes(searchTerm);

    const matchesFilter =
      selectedFilter === null || item.orderStatus === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Get count for each category
  const categoryCounts = {
    Processing: orders.filter(item => item.orderStatus === 'Processing').length,
    Shipped: orders.filter(item => item.orderStatus === 'Shipped').length,
    Cancelled: orders.filter(item => item.orderStatus === 'Cancelled').length,
    Delivered: orders.filter(item => item.orderStatus === 'Delivered').length,
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders_Data');
    XLSX.writeFile(wb, 'order_data.xlsx');
  };

  return (
    <>
      <MetaData title="Admin--All Orders" />
      {loading ? (
        <Loader />
      ) : (
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
          <Box p={['0', '16']} overflowX="auto">
            <Input
              maxW="intrinsic"
              placeholder="Search by Id or Total Price...!"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              type={'text'}
              focusBorderColor="purple.500"
            />
            {/* Filter categories */}
            <HStack spacing="4" mb="4" mt="4">
              <Button
                onClick={() => setSelectedFilter('Processing')}
                variant={selectedFilter === 'Processing' ? 'solid' : 'outline'}
                color="blue.500"
              >
                Processing ({categoryCounts.Processing})
              </Button>
              <Button
                onClick={() => setSelectedFilter('Shipped')}
                variant={selectedFilter === 'Shipped' ? 'solid' : 'outline'}
                color="orange.500"
              >
                Shipped ({categoryCounts.Shipped})
              </Button>
              <Button
                onClick={() => setSelectedFilter('Cancelled')}
                variant={selectedFilter === 'Cancelled' ? 'solid' : 'outline'}
                color="red.500"
              >
                Cancelled ({categoryCounts.Cancelled})
              </Button>
              <Button
                onClick={() => setSelectedFilter('Delivered')}
                variant={selectedFilter === 'Delivered' ? 'solid' : 'outline'}
                color="green.500"
              >
                Delivered ({categoryCounts.Delivered})
              </Button>
            </HStack>
            <Heading
              textTransform={'uppercase'}
              children={`All Orders (${ordersCount})`}
              my="16"
              textAlign={['center', 'left']}
            />
            <Button
              onClick={handleDownload}
              variant={'outline'}
              color="purple.500"
              mb="4"
            >
              Download Excel
            </Button>
            <TableContainer w={['100vw', 'full']}>
              <Table variant={'simple'} size="lg">
                <TableCaption>All Available Orders in database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Total_Price</Th>
                    <Th>Order Status</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filteredOrders.map(item => (
                    <Row key={item._id} item={item} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Sidebar />
        </Grid>
      )}
    </>
  );
};

export default Orders;

function Row({ item }) {
  // Function to determine the color based on order status
  const getStatusColor = status => {
    switch (status) {
      case 'Cancelled':
        return 'red';
      case 'Processing':
        return 'blue';
      case 'Shipped':
        return 'orange';
      case 'Delivered':
        return 'green';
      default:
        return 'black'; // Default color if none of the conditions match
    }
  };

  // Set the color based on the order status
  const statusColor = getStatusColor(item.orderStatus);

  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td color={statusColor}>{item.totalPrice}</Td>
      <Td color={statusColor}>{item.orderStatus}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Link to={`/order/${item._id}`}>
            <Button variant={'outline'} color="purple.500">
              View Order
            </Button>
          </Link>
        </HStack>
      </Td>
    </Tr>
  );
}
