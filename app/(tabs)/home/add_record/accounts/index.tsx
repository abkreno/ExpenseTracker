// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AccountPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Accounts',
        }}
      />
      <ListSection
        title="Select Account"
        items={[
          {
            name: 'Cash',
            route: '/',
            icon: 'cash-multiple',
            value: '',
          },
          {
            name: 'Account 2',
            route: '/',
            icon: 'bank',
            value: '',
          },
        ]}
      />
    </View>
  );
}
