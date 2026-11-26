import React from 'react';
import { useCategoryFilterSearch } from '../hooks/useCategoryFilterSearch';
import { useCategoryStore } from '../store(Zustand)/useCategoryStore';
import { Categorydescription } from '../header/Categorydescription';
import { CategorySection } from '../card/CategorySection';
import { CategoryCard } from '../card/CategoryCard';
import { AddCategoryModal } from '../categorybutton/AddCategoryModal';
import { CategorySlider } from '../slider/CategorySlider';

export const CategoriesPage: React.FC = () => {
  const { defaultCategories, customCategories } = useCategoryFilterSearch();
  const openAddModal = useCategoryStore((state) => state.openAddModal);
  const openDrawer = useCategoryStore((state) => state.openDrawer);

  return (
    <div className="flex flex-col gap-8 w-full max-w-full pb-14 font-sans">
      {/* Page Header */}
      <Categorydescription onAddClick={openAddModal} />

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
      <CategorySlider />
    </div>
  );
};

export default CategoriesPage;
