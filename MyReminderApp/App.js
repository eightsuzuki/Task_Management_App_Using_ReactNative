import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { UserProvider } from './src/utils/UserContext'; 
import AppNavigation from './src/navigation/AppNavigation';
import { initializeApp } from 'firebase/app';

// Googleサインインの設定
GoogleSignin.configure({
  webClientId: '748710972974-pqkqe1ra5j9vu6cb5nse7m438uj337an.apps.googleusercontent.com', // 実際のWebクライアントIDに置き換えてください
});

const firebaseConfig = {
  apiKey: 'AIzaSyALguefj3R8rO3dFBKQC-420IRp8mjXm0Y',
  authDomain: 'hnd8-7d4fb.firebaseapp.com',
  databaseURL: 'https://hnd8-7d4fb.firebaseio.com',
  projectId: 'hnd8-7d4fb',
  storageBucket: 'hnd8-7d4fb.appspot.com',
  messagingSenderId: '748710972974',
  appId: '1:748710972974:ios:abcc6a9e6fc754e0c319bf',
};

const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}