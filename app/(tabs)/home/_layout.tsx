import { useTheme } from 'react-native-paper';
import { JsStack } from 'layouts/js-stack';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  resetRecordForm,
  selectIsRecordDirty,
} from 'features/recordForm/recordFormSlice';
import { useAppDispatch } from 'features/hooks';
import { useNavigation } from 'expo-router';

export default function HomeLayout() {
  const theme = useTheme();
  const isRecordFormDirty = useSelector(selectIsRecordDirty);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <JsStack>
      <JsStack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Home',
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
      <JsStack.Screen
        name="add_record"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
        listeners={{
          beforeRemove: (e) => {
            if (isRecordFormDirty) {
              // @ts-ignore
              e.preventDefault();
              // show confirmation dialog
              Alert.alert(
                'Discard changes?',
                '',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'Discard',
                    style: 'destructive',
                    onPress: () => {
                      dispatch(resetRecordForm());
                      navigation.goBack();
                    },
                  },
                ],
                { cancelable: false }
              );
            } else {
              dispatch(resetRecordForm());
            }
          },
        }}
      />
      <JsStack.Screen
        name="add_account"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </JsStack>
  );
}
