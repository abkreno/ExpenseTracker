import { Account } from './accountSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function backupAccounts(accounts: Account[]) {
  // save accounts to local storage
  return AsyncStorage.setItem('accounts', JSON.stringify(accounts));
}

export async function loadAccounts() {
  // load accounts from local storage
  try {
    const accounts = await AsyncStorage.getItem('accounts');
    if (accounts) {
      const accountsParsed = JSON.parse(accounts);
      if (Array.isArray(accountsParsed)) {
        return accountsParsed as Account[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (err) {
    console.log('Error loading accounts from local storage', err);
    return [];
  }
}
