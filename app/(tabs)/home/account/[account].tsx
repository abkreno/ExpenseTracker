import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function AccountPage() {
  const { account } = useLocalSearchParams<{
    account: string;
  }>();
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: account }} />
      <Text>Account {account}</Text>
    </View>
  );
}
