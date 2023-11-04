import { Slot, Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../features/store';

const Header = () => (
    <Text>
        Header
    </Text>);

export default function Layout() {
  return (
    <Provider store={store}>
      <Header />
      <Tabs />
    </Provider>
  );
}