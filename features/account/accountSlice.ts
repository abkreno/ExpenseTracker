import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'features/store';
import { backupAccounts, loadAccounts } from './accountAPI';
import { currencySymbolMap } from 'features/record/recordSlice';
import { saveAccount } from 'features/accountForm/accountFormSlice';

// Define the account type

export const accountTypes = {
  CASH: 'CASH',
  GENERAL: 'GENERAL',
} as const;

export const accountIcons = {
  CASH: 'cash-multiple',
  GENERAL: 'bank',
} as const;
export interface Account {
  id: string;
  name: string;
  initialBalance: {
    type: 'NEGATIVE' | 'POSITIVE';
    amount: number;
  };
  balance: {
    amount: number;
    currency: keyof typeof currencySymbolMap;
    lastUpdatedAt: string;
  };
  type: keyof typeof accountTypes;
  color: string;
}

export interface AccountState {
  accounts: Account[];
  status: 'idle' | 'loading' | 'failed';
  defaultAccountId: string | null;
}

const initialState: AccountState = {
  accounts: [],
  status: 'idle',
  defaultAccountId: null,
};

export const backupAccountsAsync = createAsyncThunk<
  void,
  void,
  { state: { account: AccountState } }
>('account/backupAccounts', async (_, { getState }) => {
  const { accounts } = getState().account;
  const response = await backupAccounts(accounts);
  return response;
});

export const loadAccountsAsync = createAsyncThunk<
  Account[],
  void,
  { state: { account: AccountState } }
>('account/loadAccounts', async () => {
  const response = await loadAccounts();
  return response;
});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(backupAccountsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(backupAccountsAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(loadAccountsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAccountsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.accounts = action.payload;
        state.defaultAccountId = action.payload[0]?.id ?? null;
      })
      .addCase(saveAccount.fulfilled, (state, action) => {
        state.accounts = action.payload;
        backupAccounts(action.payload);
      });
  },
});

export const { addAccount, removeAccount } = accountSlice.actions;
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectAccountById = (accountId: string) => (state: RootState) => {
  return selectAccounts(state).find((account) => account.id === accountId);
};

export const selectTotalBalance = (state: RootState) =>
  state.account.accounts.reduce(
    (total, account) => total + account.balance.amount,
    0
  );
export default accountSlice.reducer;
