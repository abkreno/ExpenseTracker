// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const categoriesData = {
  foods_drinks: {
    title: 'Foods & Drinks',
    key: 'foods_drinks',
    subcategories: [
      {
        title: 'Groceries',
        key: 'groceries',
        icon: 'food',
      },
      {
        title: 'Restaurants',
        key: 'restaurants',
        icon: 'silverware-fork-knife',
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
        icon: 'cash-multiple',
      },
      {
        title: 'Renting',
        key: 'renting',
        icon: 'home',
      },
    ],
  },
};

export default function Page() {
  const { category } = useLocalSearchParams<{
    category: keyof typeof categoriesData;
  }>();
  const title = (category && categoriesData[category].title) || category;
  return (
    <View>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <ListSection
        title="Subcategories"
        items={
          (category &&
            categoriesData[category].subcategories.map((subcategory) => ({
              name: subcategory.title || '',
              route: '',
              icon: subcategory.icon,
              value: '',
            }))) ||
          []
        }
      />
    </View>
  );
}
