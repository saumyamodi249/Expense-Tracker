// src/features/categories/utils/categoryValidators.ts

export function validateCategoryName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Category name is required' };
  }
  if (trimmed.length > 40) {
    return { valid: false, error: 'Category name must be under 40 characters' };
  }
  return { valid: true };
}

export function validateAmount(val: number | string): { valid: boolean; error?: string; amount?: number } {
  const parsed = Number(val);
  if (isNaN(parsed) || parsed < 0) {
    return { valid: false, error: 'Please enter a valid positive number' };
  }
  return { valid: true, amount: parsed };
}
