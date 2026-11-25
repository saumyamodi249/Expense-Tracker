import React from 'react';
import { useAuth } from '@clerk/react';
import Main from '../component/Main';
import SignInPage from '../auth/SignIn';

const Home: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return isSignedIn ? <Main /> : <SignInPage />;
};

export default Home;
