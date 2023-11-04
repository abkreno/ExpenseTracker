import { Account } from './accountSlice';

const mockedAccounts: Account[] = [
  {
    id: '1',
    name: 'Cash',
    balance: {
      amount: 100,
      currency: 'USD',
      lastUpdatedAt: '2021-01-01',
    },
    type: 'CASH',
  },
  {
    id: '2',
    name: 'General',
    balance: {
      amount: 1000,
      currency: 'USD',
      lastUpdatedAt: '2021-01-01',
    },
    type: 'GENERAL',
  },
  {
    id: '3',
    name: 'Savings',
    balance: {
      amount: 10000,
      currency: 'USD',
      lastUpdatedAt: '2021-01-01',
    },
    type: 'GENERAL',
  },
];

export function backupAccounts(accounts: Account[]) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
}

export function loadAccounts() {
  return new Promise<Account[]>((resolve) => setTimeout(() => resolve(mockedAccounts), 1000));
}
