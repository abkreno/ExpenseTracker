// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { useAppDispatch } from 'features/hooks';
import { setType } from 'features/accountForm/accountFormSlice';
import { View } from 'react-native';
import { accountTypes, accountIcons } from 'features/account/accountSlice';

export default function SelectAccountTypePage() {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Add Account',
        }}
      />
      <ListSection
        title="Select Currency"
        items={Object.keys(accountTypes).map((accountType) => ({
          name: accountType,
          onPress: () => {
            dispatch(setType(accountType as keyof typeof accountTypes));
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/home/add_account');
            }
          },
          icon: accountIcons[accountType as keyof typeof accountTypes],
          value: '',
        }))}
      />
    </View>
  );
}
