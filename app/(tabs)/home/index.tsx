import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import {
  loadAccountsAsync,
  selectAccounts,
  selectTotalBalance,
} from 'features/account/accountSlice';
import { useAppDispatch } from 'features/hooks';
import {
  Divider,
  FAB,
  Icon,
  Text,
  MD3Theme,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { loadCategoriesAsync } from 'features/category/categorySlice';
import { loadRecordsAsync, selectRecords } from 'features/record/recordSlice';
import RecordList from 'components/RecordList';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const accounts = useSelector(selectAccounts);
  const totalBalance = useSelector(selectTotalBalance);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const records = useSelector(selectRecords);
  useEffect(() => {
    dispatch(loadAccountsAsync());
    dispatch(loadCategoriesAsync());
    dispatch(loadRecordsAsync());
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.navigationContainer}
        >
          {accounts.map((account, index) => (
            <TouchableRipple
              key={index}
              style={styles.card}
              onPress={() => {
                router.push(`/home/account/${account.id}`);
              }}
            >
              <View style={styles.accountContainer}>
                <Icon
                  source={account.type === 'CASH' ? 'cash' : 'bank'}
                  size={24}
                />
                <Text style={styles.accountText}>{account.name}</Text>
                <Text style={styles.accountAmount}>
                  {account.balance.amount} {account.balance.currency}
                </Text>
              </View>
            </TouchableRipple>
          ))}
          {/* Add new account */}
          <TouchableRipple
            style={styles.card}
            onPress={() => {
              router.push('/home/add_account');
            }}
          >
            <View style={styles.accountContainer}>
              <Icon source="plus" size={24} />
              <Text style={styles.accountText}>Add Account</Text>
            </View>
          </TouchableRipple>
        </ScrollView>
        <Divider style={styles.divider} />
        <View style={styles.card}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Total Balance</Text>
            <Text style={styles.balanceAmount}>{totalBalance}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <RecordList title="Recent Transactions" records={records} />
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color={theme.colors.onSecondary}
        onPress={() => {
          router.push('/home/add_record');
        }}
      />
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    divider: {
      marginVertical: 20,
    },
    navigationContainer: {},
    card: {
      backgroundColor: theme.colors.primaryContainer,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    accountContainer: {
      justifyContent: 'center',
      height: 100,
      width: 160,
    },
    balanceContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    balanceText: {
      color: theme.colors.onBackground,
      ...theme.fonts.headlineSmall,
    },
    balanceAmount: {
      color: theme.colors.onBackground,
      ...theme.fonts.displayLarge,
    },
    accountText: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.labelMedium,
    },
    accountAmount: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.labelLarge,
    },
    fab: {
      position: 'absolute',
      backgroundColor: theme.colors.secondary,
      color: theme.colors.onSecondary,
      margin: 16,
      right: 0,
      bottom: 0,
      borderRadius: 50,
    },
  });
