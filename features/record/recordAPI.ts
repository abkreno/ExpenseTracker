import { Record } from './recordSlice';

export function backupRecords(records: Record[]) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
}
