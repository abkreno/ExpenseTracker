import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { List, MD3Theme, Text, useTheme } from 'react-native-paper';

export default function ListSection({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    route?: string;
    icon: string | false;
    value: string;
    showRightIcon?: boolean;
    onPress?: () => void;
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
            if (item.route) {
              router.push(item.route);
            } else if (item.onPress) {
              item.onPress();
            }
          }}
          left={(props) =>
            item.icon ? (
              <List.Icon
                {...props}
                color={theme.colors.onBackground}
                icon={item.icon}
              />
            ) : null
          }
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
