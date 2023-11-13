import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

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
