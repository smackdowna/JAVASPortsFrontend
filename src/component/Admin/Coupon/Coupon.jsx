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
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { deleteCoupon, getAllCoupon } from '../../../redux/actions/coupon';

const Coupon = () => {
  const dispatch = useDispatch();
  const { coupons, couponCount } = useSelector(state => state.coupons.coupons);
  const { loading, error, message } = useSelector(state => state.deleteCoupon);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();
    const filtered = coupons.filter(
      item =>
        item.code.toLowerCase().includes(searchTerm) ||
        item.amount.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const deleteHandler = userId => {
    dispatch(deleteCoupon(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCoupon());
  }, [dispatch, message, error]);

  useEffect(() => {
    // Set filteredProducts initially with all products
    setFilteredProducts(coupons);
  }, [coupons]);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Coupon_Data');
    XLSX.writeFile(wb, 'Coupons_data.xlsx');
  };
  return (
    <>
      <MetaData title="Admin--All Coupons" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
            <Box p={['0', '8']} overflowX="auto">
              <Input
                maxW="intrinsic"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search Coupon..."
                onKeyUp={handleSearch}
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Heading
                textTransform={'uppercase'}
                children={`All Coupon (${couponCount})`}
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
                  <TableCaption>All Available Coupon in database</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Coupon Code</Th>
                      <Th>Amount</Th>
                      <Th isNumeric>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredProducts.map((item, key) => (
                      <Row
                        key={item._id}
                        item={item}
                        deleteHandler={deleteHandler}
                        loading={loading}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            <Sidebar />
          </Grid>
        </>
      )}
    </>
  );
};

export default Coupon;

function Row({ item, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.code}</Td>

      <Td>{item.amount}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => deleteHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
