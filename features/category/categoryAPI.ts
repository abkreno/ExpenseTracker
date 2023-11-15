import { Category } from './categorySlice';

const mockedCategories: Category[] = [
  {
    id: '1',
    name: 'Food',
    slug: 'food',
    icon: 'food',
    childrenIds: ['2'],
    level: 'PARENT',
  },
  {
    id: '2',
    name: 'Groceries',
    slug: 'groceries',
    icon: 'food',
    childrenIds: [],
    level: 'CHILD',
  },
  {
    id: '3',
    name: 'Transportation',
    slug: 'transportation',
    icon: 'car',
    childrenIds: ['4'],
    level: 'PARENT',
  },
  {
    id: '4',
    name: 'Car',
    slug: 'car',
    icon: 'car',
    childrenIds: [],
    level: 'CHILD',
  },
];

export function backupCategories(categories: Category[]) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
}

export function loadCategories() {
  return new Promise<Category[]>((resolve) =>
    setTimeout(() => resolve(mockedCategories), 1000)
  );
}
