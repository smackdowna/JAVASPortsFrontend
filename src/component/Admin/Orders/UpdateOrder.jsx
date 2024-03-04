import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  ChakraProvider,
  extendTheme,
  Select,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getOrderDetails,
  updateOrder,
} from '../../../redux/actions/orderAction';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import toast from 'react-hot-toast';

const theme = extendTheme({
  fonts: {
    body: 'Helvetica, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ecf0f1',
    grey: '#dcdcdc',
  },
});

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const { order, userdetails } = useSelector(state => state.order.order || {});

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderId && orderId._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

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
        return 'black';
    }
  };

  const orderStatusColor = order ? getStatusColor(order.orderStatus) : 'black';

  const [selectedStatus, setSelectedStatus] = useState('');

  const { error, message, loading } = useSelector(state => state.updateOrder);

  const handleStatusChange = async () => {
    if (selectedStatus && orderId) {
      const formData = { status: selectedStatus }; // Use the same field name as in Postman
      dispatch(updateOrder(orderId, formData));
      navigate('/orders');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });

      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
    }
  }, [dispatch, error, message]);

  

  return (
    <>
      <MetaData title="Admin--Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ChakraProvider theme={theme}>
            <Box bg="background" h="100vh" py="8">
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="center"
                align="center"
              >
                <Box
                  w={{ base: '100%', md: '80%' }}
                  p="4"
                  boxShadow="lg"
                  borderRadius="lg"
                  bg="white"
                >
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    {/* Order Items */}
                    <Box flex="1" textAlign="center">
                      <Text fontSize="xl" fontWeight="bold" mb="4">
                        Order Items
                      </Text>
                      {order &&
                      order.orderItems &&
                      order.orderItems.length > 0 ? (
                        order.orderItems.map(item => (
                          <Flex
                            key={item._id}
                            mb="4"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              w="100px"
                              h="100px"
                              borderRadius="md"
                              mb="2"
                            />
                            <Text fontWeight="bold" fontSize="lg" mb="1">
                              {item.name}
                            </Text>
                            <Text fontWeight="bold" fontSize="md" mb="1">
                              Price: ₹{item.price}
                            </Text>
                            <Text fontWeight="bold" fontSize="md" mb="1">
                              Quantity: {item.quantity}
                            </Text>
                            <Text fontSize="md" color="gray.600">
                              Product ID: {item.product}
                            </Text>
                          </Flex>
                        ))
                      ) : (
                        <Text>No items found for this order</Text>
                      )}
                    </Box>

                    {/* Vertical grey line */}
                    <Box w="1px" bg="grey" mx="4" />

                    

                    {/* Order Information */}
                    <Box flex="1" textAlign="center">
                      <Text fontSize="xl" fontWeight="bold" mb="4">
                        Order Information
                      </Text>
                      {order && order.shippingInfo && (
                        <>
                        <Text fontWeight="bold" fontSize="md" mb="1">
                            Landmark: {order.shippingInfo.landmark}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            Address: {order.shippingInfo.address}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            City: {order.shippingInfo.city}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            State: {order.shippingInfo.state}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            Country: {order.shippingInfo.country}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            PinCode: {order.shippingInfo.pinCode}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            PhoneNo: {order.shippingInfo.phoneNo}
                          </Text>
                        </>
                      )}
                      {order && (
                        <>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            Items Price: ₹{order.itemsPrice}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            Total Price: ₹{order.totalPrice}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            Discount: ₹{order.discount}
                          </Text>
                        </>
                      )}
                      {/* Display user details after discount */}
                      {userdetails && (
                        <>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            User Name: {userdetails.name}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" mb="1">
                            User Email: {userdetails.email}
                          </Text>
                        </>
                      )}

                      {/* Display orderStatus information */}
                      {order && (
                        <Text
                          fontWeight="bold"
                          fontSize="md"
                          mb="1"
                          color={orderStatusColor}
                        >
                          Order Status: {order.orderStatus}
                        </Text>
                      )}

                      {/* Order Status dropdown */}
                      {order &&
                        (order.orderStatus === 'Processing' ||
                          order.orderStatus === 'Shipped') && (
                          <Flex flexDirection="column" alignItems="center">
                            <Text fontSize="xl" fontWeight="bold" mb="4">
                              Process Order
                            </Text>
                            <Select
                              size="sm"
                              color={orderStatusColor}
                              value={selectedStatus}
                              onChange={e => setSelectedStatus(e.target.value)}
                              mb="2"
                            >
                              <option value="">Choose Status</option>
                              {order.orderStatus === 'Processing' && (
                                <option
                                  value="Shipped"
                                  style={{ color: 'orange' }}
                                >
                                  Shipped
                                </option>
                              )}
                              {order.orderStatus === 'Shipped' && (
                                <option
                                  value="Delivered"
                                  style={{ color: 'green' }}
                                >
                                  Delivered
                                </option>
                              )}
                            </Select>
                            <Button
                              onClick={handleStatusChange}
                              disabled={!selectedStatus}
                              isLoading={loading}
                            >
                              Process
                            </Button>
                          </Flex>
                        )}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </ChakraProvider>
        </>
      )}
    </>
  );
};

export default OrderDetails;
