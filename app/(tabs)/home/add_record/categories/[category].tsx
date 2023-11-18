// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import {
  Category,
  selectCategoryById,
  selectChildCategories,
} from 'features/category/categorySlice';
import { useAppDispatch } from 'features/hooks';
import { setCategoryId } from 'features/recordForm/recordFormSlice';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

export default function SelectRecordCategoryPage() {
  const { category: categoryId } = useLocalSearchParams<{
    category: Category['id'];
  }>();
  const dispatch = useAppDispatch();
  const category = useSelector(selectCategoryById(categoryId || ''));
  const title = category?.name || '';
  const childCategories = useSelector(
    selectChildCategories(categoryId || ''),
    shallowEqual
  );
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
            childCategories.map((subcategory) => ({
              name: subcategory.name || '',
              onPress: () => {
                dispatch(setCategoryId(subcategory.id));
                router.push('/home/add_record');
              },
              icon: subcategory.icon,
              color: subcategory.color,
              value: '',
            }))) ||
          []
        }
      />
    </View>
  );
}
