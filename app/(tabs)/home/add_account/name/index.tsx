import { Stack } from 'expo-router';
import { selectName, setName } from 'features/accountForm/accountFormSlice';
import { useAppDispatch } from 'features/hooks';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function AccountNamePage() {
  const name = useSelector(selectName);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Account Name',
        }}
      />
      <TextInput
        autoFocus
        value={name}
        onChangeText={(text) => dispatch(setName(text))}
        style={{
          textAlign: 'center',
          height: 200,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
}
