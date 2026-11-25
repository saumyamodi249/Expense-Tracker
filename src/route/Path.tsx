// src/route/Path.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoriesPage from '../component/categories/pages/CategoriesPage';
import Profile from '../component/profile/Profile';
import SignInPage from '../auth/SignIn';
import SignUpPage from '../auth/SignUp';

export const Path: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/categories" replace />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/profile" element={<Navigate to="/profile/account" replace />} />
      <Route path="/profile/:tab" element={<Profile />} />
      <Route
        path="/dashboard"
        element={
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-bold text-font mb-2 mt-0">Dashboard</h2>
            <p className="text-sm text-font-secondary m-0">Dashboard view</p>
          </div>
        }
      />
      <Route
        path="/expenses"
        element={
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-bold text-font mb-2 mt-0">Transactions</h2>
            <p className="text-sm text-font-secondary m-0">Transactions view</p>
          </div>
        }
      />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/categories" replace />} />
    </Routes>
  );
};

export default Path;
