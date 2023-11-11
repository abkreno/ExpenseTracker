import { Redirect } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../features/store';

export default function Page() {
  return <Redirect href={'/(tabs)/home'} />;
}
