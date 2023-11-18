// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { selectAccounts } from 'features/account/accountSlice';
import { useAppDispatch } from 'features/hooks';
import {
  selectAccount,
  selectTargetAccount,
  setAccountId,
  setTargetAccountId,
} from 'features/recordForm/recordFormSlice';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function SelectRecordAccountPage() {
  const { target } = useLocalSearchParams<{
    target?: string;
  }>();
  const isTarget = target === 'true';
  const targetAccount = useSelector(selectTargetAccount);
  const fromAccount = useSelector(selectAccount);
  const accounts = useSelector(selectAccounts);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: isTarget ? 'Target Account' : 'Account',
        }}
      />
      <ListSection
        title="Select Account"
        items={accounts
          .filter((account) => !isTarget || account.id !== fromAccount?.id)
          .map((account) => ({
            name: account.name,
            onPress: () => {
              // Handle selecting the account
              if (isTarget) {
                dispatch(setTargetAccountId(account.id));
              } else {
                if (targetAccount?.id === account.id) {
                  dispatch(setTargetAccountId(null));
                }
                dispatch(setAccountId(account.id));
              }
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push('/home/add_record');
              }
            },
            icon: account.type === 'CASH' ? 'cash-multiple' : 'bank',
            value: '',
            showRightIcon:
              (targetAccount?.id === account.id && isTarget) ||
              fromAccount?.id === account.id,
            rightIconName: 'check',
          }))}
      />
    </View>
  );
}
