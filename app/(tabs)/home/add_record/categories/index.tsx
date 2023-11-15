// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack } from 'expo-router';
import { selectParentCategories } from 'features/category/categorySlice';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

export default function SelectCategoriesPage() {
  const categories = useSelector(selectParentCategories, shallowEqual);
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Categories',
        }}
      />
      <ListSection
        title="All Categories"
        items={
          //   [
          //   {
          //     name: 'Foods & Drinks',
          //     route: '/home/add_record/categories/foods_drinks',
          //     icon: 'food',
          //     value: '',
          //     showRightIcon: true,
          //   },
          //   {
          //     name: 'Lending & Renting',
          //     route: '/home/add_record/categories/lending_renting',
          //     icon: 'cash-multiple',
          //     value: '',
          //     showRightIcon: true,
          //   },
          // ]
          categories.map((category) => ({
            name: category.name,
            route: `/home/add_record/categories/${category.id}`,
            icon: category.icon,
            value: '',
            showRightIcon: category.childrenIds.length > 0,
          }))
        }
      />
    </View>
  );
}
