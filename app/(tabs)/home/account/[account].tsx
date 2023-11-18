import Icon from 'components/Icon';
import RecordList from 'components/RecordList';
import { Stack, useLocalSearchParams } from 'expo-router';
import { selectAccountById } from 'features/account/accountSlice';
import { selectRecordsByAccount } from 'features/record/recordSlice';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { shallowEqual, useSelector } from 'react-redux';

export default function AccountPage() {
  const { account: accountId } = useLocalSearchParams<{
    account: string;
  }>();
  const account = useSelector(selectAccountById(accountId || ''));

  const theme = useTheme();
  const styles = makeStyles(theme);
  const accountRecords = useSelector(
    selectRecordsByAccount(accountId || ''),
    shallowEqual
  );
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: account?.color || theme.colors.background,
      }}
    >
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: account?.color || theme.colors.primaryContainer,
        }}
      >
        <View style={styles.accountNameContainer}>
          <Icon name={account?.type === 'CASH' ? 'cash-multiple' : 'bank'} />
          <Text style={styles.accountName}>{account?.name}</Text>
        </View>
        <Text style={styles.accountBalance}>{account?.balance.amount}</Text>
      </View>
      <RecordList
        records={accountRecords}
        styles={{ backgroundColor: account?.color || theme.colors.background }}
      />
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: theme.roundness,
    },
    accountNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    accountName: {
      ...theme.fonts.titleLarge,
      textTransform: 'uppercase',
    },
    accountBalance: {
      ...theme.fonts.displayLarge,
    },
  });
