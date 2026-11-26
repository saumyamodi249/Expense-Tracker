export interface Category {
  id: string;
  name: string;
  budget?: number;
  spent: number;
  color: string;
  icon: string;
  isDefault?: boolean;
}

export interface TransactionItem {
  id: string;
  categoryId: string;
  amount: number;
  note: string;
  date: string;
  time?: string;
}

export type CreateCategoryDTO = Omit<Category, 'id' | 'spent'> & {
  initialSpent?: number;
};

export type LogTransactionDTO = Pick<TransactionItem, 'categoryId' | 'amount' | 'note'>;
