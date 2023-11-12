// A page that displays a dropdown of all the available categories from the store

import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';

const categoriesData = {
  foods_drinks: {
    title: 'Foods & Drinks',
    key: 'foods_drinks',
    subcategories: [
      {
        title: 'Groceries',
        key: 'groceries',
      },
      {
        title: 'Restaurants',
        key: 'restaurants',
      },
    ],
  },
  lending_renting: {
    title: 'Lending & Renting',
    key: 'lending_renting',
    subcategories: [
      {
        title: 'Lending',
        key: 'lending',
      },
      {
        title: 'Renting',
        key: 'renting',
      },
    ],
  },
};

export default function Page() {
  const { category } = useLocalSearchParams<{
    category: keyof typeof categoriesData;
  }>();
  console.log(category);
  const title = (category && categoriesData[category].title) || category;
  return (
    <View>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <List.Section>
        <List.Subheader>Subcategories</List.Subheader>
        {category &&
          categoriesData[category].subcategories.map((subcategory) => (
            <List.Item
              key={subcategory.key}
              title={subcategory.title}
              // right={() => <List.Icon icon="chevron-right" />}
              onPress={() => null}
            />
          ))}
      </List.Section>
    </View>
  );
}
