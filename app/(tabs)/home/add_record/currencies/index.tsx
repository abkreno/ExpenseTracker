// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { useAppDispatch } from 'features/hooks';
import { currencySymbolMap } from 'features/record/recordSlice';
import { setCurrency } from 'features/recordForm/recordFormSlice';
import { View } from 'react-native';

export default function AccountPage() {
  const currencies = currencySymbolMap;
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: '',
        }}
      />
      <ListSection
        title="Select Currency"
        items={Object.keys(currencies).map((currency) => ({
          name: currency,
          onPress: () => {
            // Handle selecting the account
            dispatch(setCurrency(currency as keyof typeof currencySymbolMap));
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/home/add_record');
            }
          },
          value: '',
        }))}
      />
    </View>
  );
}
