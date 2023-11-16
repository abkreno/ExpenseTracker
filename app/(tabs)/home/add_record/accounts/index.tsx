// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { selectAccounts } from 'features/account/accountSlice';
import { useAppDispatch } from 'features/hooks';
import { setAccountId } from 'features/recordForm/recordFormSlice';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function AccountPage() {
  const accounts = useSelector(selectAccounts);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Accounts',
        }}
      />
      <ListSection
        title="Select Account"
        items={accounts.map((account) => ({
          name: account.name,
          onPress: () => {
            // Handle selecting the account
            dispatch(setAccountId(account.id));
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/home/add_record');
            }
          },
          iconName: account.type === 'CASH' ? 'cash-multiple' : 'bank',
          value: '',
        }))}
      />
    </View>
  );
}
