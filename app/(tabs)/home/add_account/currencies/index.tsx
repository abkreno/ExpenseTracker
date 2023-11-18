// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { useAppDispatch } from 'features/hooks';
import { currencySymbolMap } from 'features/record/recordSlice';
import { setBalanceCurrency } from 'features/accountForm/accountFormSlice';
import { View } from 'react-native';

export default function SelectAccountCurrencyPage() {
  const currencies = currencySymbolMap;
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
        items={Object.keys(currencies).map((currency) => ({
          name: currency,
          onPress: () => {
            dispatch(
              setBalanceCurrency(currency as keyof typeof currencySymbolMap)
            );
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/home/add_account');
            }
          },
          value: '',
        }))}
      />
    </View>
  );
}
