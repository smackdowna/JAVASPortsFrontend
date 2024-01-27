// Login.jsx
import React from 'react';
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'Welcome To Java Sports'} />
          <Link to="/login">
            <Button my="4" colorScheme={'yellow'} type="submit">
              Login
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
