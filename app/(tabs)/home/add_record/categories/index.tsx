// A page that displays a dropdown of all the available categories from the store

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
      <List.Section>
        <List.Subheader>All Categories</List.Subheader>
        <List.Item
          title="Foods & Drinks"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() =>
            router.push('/home/add_record/categories/foods_drinks')
          }
        />
        <List.Item
          title="Lending & Renting"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() =>
            router.push('/home/add_record/categories/lending_renting')
          }
        />
      </List.Section>
    </View>
  );
}
