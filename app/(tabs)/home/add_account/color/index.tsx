// A page that displays a dropdown of all the available categories from the store

import ListSection from 'components/ListSection';
import { Stack, router } from 'expo-router';
import { useAppDispatch } from 'features/hooks';
import {} from 'features/record/recordSlice';
import {
  accountColorsMap,
  setColor,
} from 'features/accountForm/accountFormSlice';
import { View } from 'react-native';
import Icon from 'components/Icon';

export default function SelectAccountColorPage() {
  const colors = accountColorsMap;
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Add Account',
        }}
      />
      <ListSection
        title="Select Color"
        items={Object.keys(colors).map((color) => ({
          name: color,
          onPress: () => {
            dispatch(setColor(color as keyof typeof accountColorsMap));
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/home/add_account');
            }
          },
          value: '',
          icon: () => <Icon name="circle" color={color} />,
        }))}
      />
    </View>
  );
}
