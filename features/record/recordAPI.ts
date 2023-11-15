import { Record } from './recordSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function backupRecords(records: Record[]) {
  // save records to local storage
  return AsyncStorage.setItem('records', JSON.stringify(records));
}

export async function loadRecords() {
  // load records from local storage
  try {
    const records = await AsyncStorage.getItem('records');
    if (records) {
      const recordsParsed = JSON.parse(records);
      if (Array.isArray(recordsParsed)) {
        return recordsParsed as Record[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (err) {
    console.log('Error loading records from local storage', err);
    return [];
  }
}
