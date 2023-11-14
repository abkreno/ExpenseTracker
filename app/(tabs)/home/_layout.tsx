import { Stack } from 'expo-router';
import { View } from 'react-native';
import { MD3DarkTheme, useTheme } from 'react-native-paper';

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
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
      <Stack.Screen
        name="add_record"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="add_account"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
