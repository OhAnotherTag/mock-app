import '../styles/globals.scss';
import { AuthProvider } from '../context/AuthContext';
import {
  ChakraProvider,
  theme,
  extendTheme,
  ColorModeProvider,
} from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{ initialColorMode: 'dark', useSystemColorMode: false }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
