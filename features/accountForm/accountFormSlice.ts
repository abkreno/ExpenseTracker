import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAccounts } from 'features/account/accountAPI';
import { loadAccountsAsync } from 'features/account/accountSlice';
import { selectFlatCategories } from 'features/category/categorySlice';
import { Account } from 'features/account/accountSlice';
import { RootState } from 'features/store';

interface AccountFormState extends Omit<Account, 'id'> {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AccountFormState = {
  status: 'idle',
  name: '',
  initialBalance: 0,
  color: '',
  balance: {
    amount: 0,
    currency: '',
    lastUpdatedAt: '',
  },
  type: 'CASH',
};

export const saveAccount = createAsyncThunk<
  Account[],
  void,
  { state: { accountForm: AccountFormState } }
>('accountForm/saveAccount', async (_, { getState }) => {
  const { accountForm } = getState();
  const { status, ...account } = accountForm;
  const accounts = await loadAccounts();
  const uniqueId = Math.max(...accounts.map((account) => +account.id)) + 1;
  const updatedAccount = {
    id: uniqueId.toString(),
    ...account,
  };
  return [...accounts, updatedAccount];
});

export const accountFormSlice = createSlice({
  name: 'accountForm',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<'CASH' | 'GENERAL'>) => {
      state.type = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setInitialBalance: (state, action: PayloadAction<number>) => {
      state.initialBalance = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setBalance: (
      state,
      action: PayloadAction<{
        amount: number;
        currency: string;
        lastUpdatedAt: string;
      }>
    ) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveAccount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(saveAccount.fulfilled, (state) => {
      state.status = 'idle';
    });
  },
});

export const selectType = (state: RootState) => state.accountForm.type;

export const selectName = (state: RootState) => state.accountForm.name;

export const selectInitialBalance = (state: RootState) =>
  state.accountForm.initialBalance;

export const selectColor = (state: RootState) => state.accountForm.color;

export const selectBalance = (state: RootState) => state.accountForm.balance;

export const { setType } = accountFormSlice.actions;

export default accountFormSlice.reducer;
