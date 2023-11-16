import { Category } from './categorySlice';
import categories from './fixtures';

export function backupCategories(categories: Category[]) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
}

export function loadCategories() {
  return new Promise<Category[]>((resolve) =>
    resolve(categories as Category[])
  );
}
