import { selectAccountById } from 'features/account/accountSlice';
import { selectCategoryById } from 'features/category/categorySlice';
import { Record } from 'features/record/recordSlice';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Divider, MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from './Icon';
import { getRecordAmountColor } from './AmountInput';

export default function RecordListItem({
  record,
  onPress,
  showDivider = true,
}: {
  record: Record;
  onPress: any;
  showDivider?: boolean;
}) {
  const category = useSelector(selectCategoryById(record.categoryId || ''));
  const account = useSelector(selectAccountById(record.accountId || ''));
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.recordContainer}>
        <Icon
          name={category?.icon || 'help'}
          color={category?.color}
          size={24}
        />
        <View style={styles.recordTextContainer}>
          <Text style={styles.recordText}>
            {category?.name || 'No Category'}
          </Text>
          <Text style={styles.recordAccount}>
            {account?.name || 'No Account'}
          </Text>
        </View>
        <Text
          style={{
            ...styles.recordAmount,
            color: getRecordAmountColor(record.type, true),
          }}
        >
          {record.amount} {account?.balance.currency}
        </Text>
      </View>
      {showDivider ? (
        <Divider
          style={{
            backgroundColor: theme.colors.onPrimaryContainer,
          }}
        />
      ) : null}
    </Pressable>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    recordContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 16,
      backgroundColor: theme.colors.elevation.level2,
      gap: 16,
    },
    recordTextContainer: {
      flex: 1,
      textAlign: 'left',
    },
    recordText: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.labelMedium,
      flex: 1,
      textAlign: 'left',
    },
    recordAccount: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.labelLarge,
      textTransform: 'uppercase',
      flex: 1,
      textAlign: 'left',
    },
    recordAmount: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.labelLarge,
    },
  });
