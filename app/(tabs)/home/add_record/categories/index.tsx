// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { Text, View } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';

export default function Page() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Categories',
        }}
      />
      <ListSection
        title="All Categories"
        items={[
          {
            name: 'Foods & Drinks',
            route: '/home/add_record/categories/foods_drinks',
            icon: 'food',
            value: '',
            showRightIcon: true,
          },
          {
            name: 'Lending & Renting',
            route: '/home/add_record/categories/lending_renting',
            icon: 'cash-multiple',
            value: '',
            showRightIcon: true,
          },
        ]}
      />
    </View>
  );
}
