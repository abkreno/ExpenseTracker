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
import { RootState } from 'features/store';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Page() {
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
                // Handle selecting the category
                dispatch(setCategoryId(subcategory.id));
                router.push('/home/add_record');
              },
              iconName: subcategory.icon,
              color: subcategory.color,
              value: '',
            }))) ||
          []
        }
      />
    </View>
  );
}
