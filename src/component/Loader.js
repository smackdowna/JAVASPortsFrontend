// Loader.js
import React from 'react';
import { Spinner } from '@chakra-ui/react'; // Update with your preferred UI library

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner size="xl" color="purple.500" />
    </div>
  );
};

export default Loader;
