// src/features/categories/pages/CategoriesPage.tsx
import React from 'react';
import { useCategoryFilters } from '../hooks/useCategoryFilterSearch';
import { useCategoryStore } from '../store(Zustand)/useCategoryStore';
import { CategoryPageHeader } from '../header/Categorydescription';
import { CategorySection } from '../card/CategorySection';
import { CategoryCard } from '../card/CategoryCard';
import { AddCategoryModal } from '../categorybutton/AddCategoryModal';
import { CategoryDetailDrawer } from '../slider/CategorySlider';

export const CategoriesPage: React.FC = () => {
  const { defaultCategories, customCategories } = useCategoryFilters();
  const openAddModal = useCategoryStore((state) => state.openAddModal);
  const openDrawer = useCategoryStore((state) => state.openDrawer);

  return (
    <div className="flex flex-col gap-8 w-full max-w-full pb-14 font-sans">
      {/* Page Header */}
      <CategoryPageHeader onAddClick={openAddModal} />

      {/* Default Categories Section */}
      <CategorySection title="Default categories" count={defaultCategories.length}>
        {defaultCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => openDrawer(category.id)}
          />
        ))}
      </CategorySection>

      {/* Custom Categories Section */}
      <CategorySection title="Custom categories" count={customCategories.length}>
        {customCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => openDrawer(category.id)}
          />
        ))}
      </CategorySection>

      {/* Add New Category Modal */}
      <AddCategoryModal />

      {/* Slide-over Detail Drawer */}
      <CategoryDetailDrawer />
    </div>
  );
};

export default CategoriesPage;
