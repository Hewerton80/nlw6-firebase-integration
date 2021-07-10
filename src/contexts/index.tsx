
import { ReactNode } from "react";
import {ThemeContextProvider} from './ThemeContext';
import { AuthContextProvider } from './AuthContext';

import { ModalProvider } from 'styled-react-modal'
import { ModalBackground } from '../styles/modalBackground';

interface ProvidersProps  {
    children: ReactNode
} 

function Providers({children}:ProvidersProps) {
  return (
    <ThemeContextProvider>
      <ModalProvider backgroundComponent={ModalBackground}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </ModalProvider>
    </ThemeContextProvider >
  );
}

export default Providers;