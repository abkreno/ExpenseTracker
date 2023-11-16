import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Icon({
  name,
  color,
  size,
}: {
  name?: string;
  color?: string;
  size?: number;
}) {
  const theme = useTheme();
  return (
    <MaterialCommunityIcons
      name={name || 'help'}
      size={size || 22}
      color={color || theme.colors.primary}
    />
  );
}
