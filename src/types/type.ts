// src/types/type.ts

// ==========================================
// Items Types
// ==========================================
export interface Item {
  id: string;
  name: string;
  price: number;
  unit?: string;
  createdAt: string;
  category?: string;
}

export interface CreateItemInput {
  name: string;
  price: number;
  unit?: string;
  category?: string;
}

export interface UpdateItemInput {
  id: string;
  name?: string;
  price?: number;
  unit?: string;
  category?: string;
}

// ==========================================
// Navigation / Routing Types
// ==========================================
export type RouteOption = 'dashboard' | 'expenses' | 'items';
