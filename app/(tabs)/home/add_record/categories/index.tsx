import ListSection from 'components/ListSection';
import { Stack } from 'expo-router';
import { selectParentCategories } from 'features/category/categorySlice';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

export default function SelectRecordCategoriesPage() {
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
        items={categories.map((category) => ({
          name: category.name,
          route: `/home/add_record/categories/${category.id}`,
          icon: category.icon,
          color: category.color,
          value: '',
          showRightIcon: category.children.length > 0,
        }))}
      />
    </View>
  );
}
