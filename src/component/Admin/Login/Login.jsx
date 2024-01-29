// Login.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userAction';
import Asset3 from "../../../assets/Asset 3.png";
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const{loading,error} = useSelector(state=>state.login)
  const [password, setPassword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

   
  }, [dispatch, error]);

  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Image src={Asset3} height={'58'}/>
          <Heading children={'Welcome To Java Sports'} />
          <form onSubmit={submitHandler}>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                type={'email'}
                focusBorderColor="black"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="black"
              />
            </Box>
            <Button isLoading={loading} my="4" colorScheme={'yellow'} type="submit">
              Login
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
