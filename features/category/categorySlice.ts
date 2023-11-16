import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'features/store';
import { backupCategories, loadCategories } from './categoryAPI';

// Define the category type
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  children: Category[];
}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
};

export const backupCategoriesAsync = createAsyncThunk<
  void,
  void,
  { state: { category: CategoryState } }
>('category/backupCategories', async (_, { getState }) => {
  const { categories } = getState().category;
  const response = await backupCategories(categories);
  return response;
});

export const loadCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { state: { category: CategoryState } }
>('category/loadCategories', async () => {
  const response = await loadCategories();
  return response;
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(backupCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(backupCategoriesAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(loadCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      });
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;

export const selectParentCategories = (state: RootState) =>
  state.category.categories;

export const selectFlatCategories = (state: RootState) => {
  return state.category.categories.flatMap((category) => [
    category,
    ...(category.children ?? []),
  ]);
};

export const selectCategoryById =
  (categoryId: string) => (state: RootState) => {
    const flatCategories = selectFlatCategories(state);
    return flatCategories.find((category) => category.id === categoryId);
  };

export const selectChildCategories =
  (categoryId: string) => (state: RootState) => {
    const category = state.category.categories.find(
      (category) => category.id === categoryId
    );
    if (!category) return [];
    return category.children;
  };

export default categorySlice.reducer;
