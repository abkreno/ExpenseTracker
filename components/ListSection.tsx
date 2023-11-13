import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import {
  List,
  MD2Colors,
  MD3Colors,
  MD3DarkTheme,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';

export default function ListSection({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    route: string;
    icon: string;
    value: string;
    showRightIcon?: boolean;
  }[];
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <List.Section style={styles.section}>
      <List.Subheader style={styles.title}>{title}</List.Subheader>
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          titleStyle={styles.listItemLeftText}
          style={styles.listItem}
          onPress={() => {
            router.push(item.route);
          }}
          left={(props) => (
            <List.Icon
              {...props}
              color={theme.colors.onBackground}
              icon={item.icon}
            />
          )}
          right={(props) => (
            <>
              <Text style={styles.listItemRightText}>{item.value}</Text>
              {item.showRightIcon && (
                <List.Icon
                  {...props}
                  color={theme.colors.onBackground}
                  icon="chevron-right"
                />
              )}
            </>
          )}
        />
      ))}
    </List.Section>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    section: {
      borderColor: theme.colors.outlineVariant,
      borderBottomWidth: 1,
    },
    title: {
      color: theme.colors.onBackground,
    },
    listItem: {
      backgroundColor: theme.colors.background,
      color: theme.colors.onBackground,
      margin: 0,
      paddingVertical: 10,
      borderColor: theme.colors.outlineVariant,
      borderTopWidth: 1,
    },
    listItemLeftText: {
      color: theme.colors.onBackground,
    },
    listItemRightText: {
      textAlign: 'center',
      color: theme.colors.onBackground,
      paddingTop: 3,
    },
  });
