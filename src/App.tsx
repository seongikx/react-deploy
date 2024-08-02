// src/App.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ApiProvider>
            <Routes />
          </ApiProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
