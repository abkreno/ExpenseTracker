import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { List, MD3Theme, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import Icon from './Icon';

export default function ListSection({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    route?: string;
    icon?: string | IconSource;
    value: string;
    color?: string;
    showRightIcon?: boolean;
    isRequired?: boolean;
    onPress?: () => void;
  }[];
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <List.Section style={styles.section}>
      <List.Subheader style={styles.title}>{title}</List.Subheader>
      <ScrollView>
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
                  color={item.color || theme.colors.onBackground}
                  icon={
                    typeof item.icon === 'string'
                      ? () => (
                          <Icon name={item.icon as string} color={item.color} />
                        )
                      : item.icon
                  }
                />
              ) : null
            }
            right={(props) => (
              <>
                <Text
                  style={{
                    ...styles.listItemRightText,
                    color: item.value
                      ? theme.colors.onBackground
                      : theme.colors.error,
                  }}
                >
                  {item.value || (item.isRequired && 'Required')}
                </Text>
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
      </ScrollView>
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
      maxWidth: '50%',
    },
  });
