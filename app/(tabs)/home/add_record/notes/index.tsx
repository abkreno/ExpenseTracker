import { Stack } from 'expo-router';
import { useAppDispatch } from 'features/hooks';
import { selectNotes, setNotes } from 'features/recordForm/recordFormSlice';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function RecordNotesPage() {
  const notes = useSelector(selectNotes);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Notes',
        }}
      />
      <TextInput
        autoFocus
        value={notes}
        onChangeText={(text) => dispatch(setNotes(text))}
        style={{
          textAlign: 'center',
          height: 200,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
}
