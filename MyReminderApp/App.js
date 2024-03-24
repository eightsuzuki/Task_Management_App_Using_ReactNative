import React from 'react';
import { UserProvider } from './src/utils/UserContext'; 
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}
