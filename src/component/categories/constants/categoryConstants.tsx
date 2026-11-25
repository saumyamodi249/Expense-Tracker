// src/component/categories/constants/categoryConstants.tsx
import React from 'react';
import {
  FiShoppingBag,
  FiCoffee,
  FiGift,
  FiTv,
  FiBookOpen,
  FiLink,
  FiMusic,
  FiTool,
  FiShoppingCart,
  FiHome,
  FiHeart,
  FiFilm,
  FiCamera,
  FiSmartphone,
  FiTruck,
} from 'react-icons/fi';
import {
  IoPawOutline,
  IoSparklesOutline,
  IoGameControllerOutline,
  IoLaptopOutline,
  IoFastFoodOutline,
  IoRestaurantOutline,
  IoCarSportOutline,
  IoAirplaneOutline,
  IoBarbellOutline,
  IoMedkitOutline,
  IoReceiptOutline,
  IoCardOutline,
  IoWalletOutline,
  IoCashOutline,
  IoSchoolOutline,
  IoShirtOutline,
  IoBeerOutline,
  IoTrendingUpOutline,
  IoBriefcaseOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { HiOutlineTag } from 'react-icons/hi2';

// 1. Category Color Palette (Exact same 10 colors as Profile Accent Color)
export type CategoryColorKey =
  | 'charcoal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'rose'
  | 'crimson'
  | 'orange'
  | 'amber'
  | 'teal'
  | 'green'
  | 'terracotta'
  | 'rust'
  | 'forest'
  | 'brown'
  | 'cobalt'
  | 'violet';

export const CATEGORY_COLORS: CategoryColorKey[] = [
  'charcoal',
  'blue',
  'indigo',
  'purple',
  'rose',
  'crimson',
  'orange',
  'amber',
  'teal',
  'green',
];

export const DEFAULT_CATEGORY_COLOR: CategoryColorKey = 'charcoal';

export function normalizeCategoryColor(color?: string): CategoryColorKey {
  if (color) {
    const lower = color.toLowerCase();
    const aliasMap: Record<string, CategoryColorKey> = {
      terracotta: 'orange',
      rust: 'crimson',
      forest: 'green',
      brown: 'charcoal',
      cobalt: 'blue',
      violet: 'purple',
    };
    if (aliasMap[lower]) return aliasMap[lower];
    if (CATEGORY_COLORS.includes(lower as CategoryColorKey)) {
      return lower as CategoryColorKey;
    }
  }
  return DEFAULT_CATEGORY_COLOR;
}

// 2. Category Icons Library (Expanded collection)
export interface IconOption {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export const SELECTABLE_ICONS: IconOption[] = [
  { key: 'sparkles', label: 'General / Sparkles', icon: <IoSparklesOutline size={18} /> },
  { key: 'tag', label: 'Tag / Retail', icon: <HiOutlineTag size={18} /> },
  { key: 'cart', label: 'Groceries / Cart', icon: <FiShoppingCart size={18} /> },
  { key: 'bag', label: 'Shopping', icon: <FiShoppingBag size={18} /> },
  { key: 'food', label: 'Food & Dining', icon: <IoFastFoodOutline size={18} /> },
  { key: 'restaurant', label: 'Restaurant', icon: <IoRestaurantOutline size={18} /> },
  { key: 'coffee', label: 'Coffee & Cafe', icon: <FiCoffee size={18} /> },
  { key: 'beer', label: 'Drinks & Nightlife', icon: <IoBeerOutline size={18} /> },
  { key: 'car', label: 'Transport / Car', icon: <IoCarSportOutline size={18} /> },
  { key: 'airplane', label: 'Flights / Travel', icon: <IoAirplaneOutline size={18} /> },
  { key: 'globe', label: 'Vacation / Explore', icon: <IoGlobeOutline size={18} /> },
  { key: 'home', label: 'Housing & Rent', icon: <FiHome size={18} /> },
  { key: 'receipt', label: 'Bills & Utilities', icon: <IoReceiptOutline size={18} /> },
  { key: 'card', label: 'Credit Card / Debt', icon: <IoCardOutline size={18} /> },
  { key: 'wallet', label: 'Cash & Wallet', icon: <IoWalletOutline size={18} /> },
  { key: 'cash', label: 'Income / Salary', icon: <IoCashOutline size={18} /> },
  { key: 'briefcase', label: 'Business & Work', icon: <IoBriefcaseOutline size={18} /> },
  { key: 'trending', label: 'Investments & Savings', icon: <IoTrendingUpOutline size={18} /> },
  { key: 'gym', label: 'Fitness & Gym', icon: <IoBarbellOutline size={18} /> },
  { key: 'medkit', label: 'Health & Medical', icon: <IoMedkitOutline size={18} /> },
  { key: 'heart', label: 'Personal & Wellness', icon: <FiHeart size={18} /> },
  { key: 'pet', label: 'Pet Care', icon: <IoPawOutline size={18} /> },
  { key: 'game', label: 'Gaming & Fun', icon: <IoGameControllerOutline size={18} /> },
  { key: 'tv', label: 'Streaming & TV', icon: <FiTv size={18} /> },
  { key: 'film', label: 'Cinema & Movies', icon: <FiFilm size={18} /> },
  { key: 'music', label: 'Music & Audio', icon: <FiMusic size={18} /> },
  { key: 'book', label: 'Books & Learning', icon: <FiBookOpen size={18} /> },
  { key: 'school', label: 'Education / Tuition', icon: <IoSchoolOutline size={18} /> },
  { key: 'laptop', label: 'Tech & Electronics', icon: <IoLaptopOutline size={18} /> },
  { key: 'phone', label: 'Phone & Internet', icon: <FiSmartphone size={18} /> },
  { key: 'camera', label: 'Photography', icon: <FiCamera size={18} /> },
  { key: 'shirt', label: 'Clothes & Fashion', icon: <IoShirtOutline size={18} /> },
  { key: 'gift', label: 'Gifts & Donations', icon: <FiGift size={18} /> },
  { key: 'wrench', label: 'Repairs & Tools', icon: <FiTool size={18} /> },
  { key: 'truck', label: 'Delivery & Shipping', icon: <FiTruck size={18} /> },
  { key: 'shield', label: 'Insurance & Security', icon: <IoShieldCheckmarkOutline size={18} /> },
  { key: 'link', label: 'Subscriptions & Misc', icon: <FiLink size={18} /> },
];

const iconMap: Record<string, React.ReactNode> = Object.fromEntries(
  SELECTABLE_ICONS.map((i) => [i.key, i.icon])
);

export function getCategoryIconElement(iconKey: string, size = 18): React.ReactNode {
  return iconMap[iconKey] || <FiShoppingBag size={size} />;
}
