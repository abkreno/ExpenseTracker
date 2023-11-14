import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function SettingsPage() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: 'Settings' }} />
      <Text>Index page of Settings Tab</Text>
    </View>
  );
}
