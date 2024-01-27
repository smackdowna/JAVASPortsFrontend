import {
  Button,
  Container,
  Grid,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';
import { createCoupon } from '../../../redux/actions/coupon';

const CreateCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(state => state.coupon);

  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');

  const [showVerificationBox, setShowVerificationBox] = useState(false);

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the default form submission behavior
    const myForm = new FormData();
    myForm.append('code', code);
    myForm.append('amount', amount);

    dispatch(createCoupon(myForm));
  };

  const verifyData = e => {
    e.preventDefault();
    setShowVerificationBox(true);
  };

  const handleVerificationBoxToggle = () => {
    setShowVerificationBox(!showVerificationBox);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/coupons');
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      <MetaData title="Admin--Create Coupon" />
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Container py="16">
          <form onSubmit={handleSubmit}>
            <Heading
              textTransform={'uppercase'}
              children="Create Coupon"
              my="16"
              textAlign={['center', 'left']}
            />

            <VStack m="auto" spacing={'8'}>
              <Input
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Coupon Code"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount"
                type={'number'}
                focusBorderColor="purple.500"
              />

              <Button
                w="full"
                isLoading={loading}
                colorScheme={'purple'}
                type="submit"
              >
                Create
              </Button>
              <Button
                w="full"
                colorScheme={'yellow'}
                type="submit"
                onClick={verifyData}
              >
                Verify
              </Button>
            </VStack>
          </form>
        </Container>

        <Sidebar />

        {showVerificationBox && (
          <Container
            position="fixed"
            top="0"
            right="0"
            bottom="0"
            p="4"
            bgColor="white"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <VStack spacing={4}>
              <Heading as="h2" size="md">
                Verification Details
              </Heading>
              <div>
                <strong>Coupon Code:</strong> {code}
              </div>
              <div>
                <strong>Amount:</strong> {amount}
              </div>

              <Button onClick={handleVerificationBoxToggle}>Close</Button>
            </VStack>
          </Container>
        )}
      </Grid>
    </>
  );
};

export default CreateCoupon;
