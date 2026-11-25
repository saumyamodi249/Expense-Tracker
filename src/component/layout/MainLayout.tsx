// src/component/layout/MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { RouteOption } from '../../types/type';

const { Content } = Layout;

export interface MainLayoutProps {
  currentRoute?: RouteOption;
  onNavigate?: (route: RouteOption) => void;
  onSearch?: (query: string) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentRoute,
  onNavigate,
  onSearch,
  children,
}) => {
  return (
    <Layout className="!min-h-screen !h-screen !w-full !bg-background text-font flex flex-row overflow-hidden">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* 2. Main Viewport Area */}
      <Content className="!bg-background flex-1 !h-screen flex flex-col overflow-hidden">
        {/* Top Navigation Header */}
        <Header onSearch={onSearch} onNavigate={onNavigate} />

        {/* Page Content Detail */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {children}
        </main>
      </Content>
    </Layout>
  );
};

export default MainLayout;
