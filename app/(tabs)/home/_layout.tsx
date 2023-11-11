import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: 'Add Record',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
