import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAccounts } from 'features/account/accountAPI';
import { Account } from 'features/account/accountSlice';
import { RootState } from 'features/store';
import { currencySymbolMap } from 'features/record/recordSlice';

export const accountColorsMap = {
  '#FFCDD2': '#FFCDD2',
  '#F8BBD0': '#F8BBD0',
  '#E1BEE7': '#E1BEE7',
  '#D1C4E9': '#D1C4E9',
  '#C5CAE9': '#C5CAE9',
  '#BBDEFB': '#BBDEFB',
  '#B3E5FC': '#B3E5FC',
  '#B2EBF2': '#B2EBF2',
  '#B2DFDB': '#B2DFDB',
  '#C8E6C9': '#C8E6C9',
  '#DCEDC8': '#DCEDC8',
  '#F0F4C3': '#F0F4C3',
  '#FFF9C4': '#FFF9C4',
  '#FFECB3': '#FFECB3',
  '#FFE0B2': '#FFE0B2',
  '#FFCCBC': '#FFCCBC',
  '#D7CCC8': '#D7CCC8',
  '#F5F5F5': '#F5F5F5',
};

interface AccountFormState extends Omit<Account, 'id'> {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AccountFormState = {
  status: 'idle',
  name: '',
  initialBalance: 0,
  color: accountColorsMap['#FFCDD2'],
  balance: {
    amount: 0,
    currency: 'USD',
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
  const uniqueId = Math.max(...accounts.map((account) => +account.id), 0) + 1;
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
    setBalanceAmount: (state, action: PayloadAction<number>) => {
      state.balance.amount = action.payload;
    },
    setBalanceCurrency: (
      state,
      action: PayloadAction<keyof typeof currencySymbolMap>
    ) => {
      state.balance.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveAccount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(saveAccount.fulfilled, (state) => {
      state = { ...initialState };
    });
  },
});

export const selectType = (state: RootState) => state.accountForm.type;

export const selectName = (state: RootState) => state.accountForm.name;

export const selectInitialBalance = (state: RootState) =>
  state.accountForm.initialBalance;

export const selectColor = (state: RootState) => state.accountForm.color;

export const selectBalance = (state: RootState) => state.accountForm.balance;

export const {
  setType,
  setBalanceAmount,
  setBalanceCurrency,
  setColor,
  setInitialBalance,
  setName,
} = accountFormSlice.actions;

export default accountFormSlice.reducer;
