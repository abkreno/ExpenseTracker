import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { store } from 'features/store';
import { Provider } from 'react-redux';
import { PaperProvider, Text, useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <PaperProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 100, paddingTop: 20 },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarItemStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              },
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused
                      ? theme.colors.primary
                      : theme.colors.backdrop,
                  }}
                >
                  Home
                </Text>
              ),

              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="home"
                  color={focused ? theme.colors.primary : theme.colors.backdrop}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarItemStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              },
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused
                      ? theme.colors.primary
                      : theme.colors.backdrop,
                  }}
                >
                  Settings
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="gear"
                  color={focused ? theme.colors.primary : theme.colors.backdrop}
                />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </Provider>
  );
}
