import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// * Application Theme
// - Load the theme and wrap the application with it
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);