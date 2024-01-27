import {
  Box,
  Grid,
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/admin';
import MetaData from '../../MetaData';
import Loader from '../../Loader';

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users, userCount } = useSelector((state) => state.users.users);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNo && user.phoneNo.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  


  return (
    <>
      <MetaData title="Admin--ALL Users" />
      {loading ? (
        <Loader />
      ) : (
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
          <Box p={['0', '16']} overflowX="auto">
            <Input
              maxW="intrinsic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, Email, Phone, or ID..."
              type={'text'}
              focusBorderColor="purple.500"
            />
            <Heading
              textTransform={'uppercase'}
              children={`All Users (${userCount})`}
              my="16"
              textAlign={['center', 'left']}
            />
            <TableContainer w={['100vw', 'full']}>
              <Table variant={'simple'} size="lg">
                <TableCaption>All Available Users in the database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>MobileNo</Th>
                    <Th>Gender</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filteredUsers.map((item) => (
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

export default Users;

function Row({ item }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.full_name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.phoneNo}</Td>
      <Td>{item.gender}</Td>
    </Tr>
  );
}
