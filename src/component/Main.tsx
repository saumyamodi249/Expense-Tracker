import React from 'react';
import Path from '../route/Path';
import { MainLayout } from './layout/MainLayout';

const Main: React.FC = () => {
  return (
    <MainLayout>
      <Path />
    </MainLayout>
  );
};

export default Main;
