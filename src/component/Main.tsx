import React, { useEffect } from 'react';
import { useUser } from '@clerk/react';
import Path from '../route/Path';
import { MainLayout } from './layout/MainLayout';
import { syncProfileUser } from '../store/profileStore';
import { syncCategoryUser } from './categories/store(Zustand)/useCategoryStore';

const Main: React.FC = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;
    syncCategoryUser(user.id);
    syncProfileUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
    });
  }, [user?.id, user?.firstName, user?.lastName, user?.fullName, user?.primaryEmailAddress?.emailAddress]);

  return (
    <MainLayout>
      <Path />
    </MainLayout>
  );
};

export default Main;
