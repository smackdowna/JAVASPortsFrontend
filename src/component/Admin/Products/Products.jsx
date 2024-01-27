import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
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
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { deleteProduct, getAllProducts } from '../../../redux/actions/admin';

const Products = () => {
  const dispatch = useDispatch();
  const { products, productsCount } = useSelector(
    state => state.products.products
  );
  const { loading, error, message } = useSelector(state => state.deleteProduct);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const deleteHandler = userId => {
    dispatch(deleteProduct(userId));
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

    dispatch(getAllProducts());
  }, [dispatch, message, error]);

  useEffect(() => {
    // Set filteredProducts initially with all products
    setFilteredProducts(products);
  }, [products]);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products_Data');
    XLSX.writeFile(wb, 'products_data.xlsx');
  };
  return (
    <>
      <MetaData title="Admin--All Products" />
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
                placeholder="Search Product..."
                onKeyUp={handleSearch}
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Heading
                textTransform={'uppercase'}
                children={`All Products (${productsCount})  `}
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
                  <TableCaption>
                    All Available Products in database
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Name</Th>
                      <Th>Image</Th>
                      <Th>Category</Th>
                      <Th>Price</Th>
                      <Th>Stock</Th>
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

export default Products;

function Row({ item, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>
        <Image src={item.images[0].url} />
      </Td>
      <Td>{item.category}</Td>
      <Td>{item.price}</Td>
      <Td>{item.stock}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Link to={`/product/${item._id}`}>
            <Button variant={'outline'} color="purple.500">
              View Product
            </Button>
          </Link>
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
