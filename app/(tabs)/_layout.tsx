import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { store } from 'features/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

export default function TabsLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="home"
            options={{
              tabBarLabel: 'Home',
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="home"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              tabBarLabel: 'Settings',
              title: 'Settings',
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="gear"
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </Provider>
  );
}
