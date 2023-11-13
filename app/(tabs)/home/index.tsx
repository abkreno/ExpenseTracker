import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { useSelector } from 'react-redux';
import {
  loadAccountsAsync,
  selectAccounts,
  selectTotalBalance,
} from 'features/account/accountSlice';
import { useAppDispatch } from 'features/hooks';
import {
  Chip,
  FAB,
  Icon,
  MD3DarkTheme,
  MD3Theme,
  Surface,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
// import { FAB } from 'react-native-paper';

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const accounts = useSelector(selectAccounts);
  const totalBalance = useSelector(selectTotalBalance);
  const theme = useTheme();
  const styles = makeStyles(MD3DarkTheme);
  useEffect(() => {
    dispatch(loadAccountsAsync());
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.navigationContainer}>
        {accounts.map((account, index) => (
          <TouchableRipple
            key={index}
            onPress={() => {
              router.push(`/home/add_record/accounts/${account.id}`);
            }}
          >
            <View style={styles.navigationCard}>
              <Icon
                source={account.type === 'CASH' ? 'cash' : 'bank'}
                size={24}
              />
              <Text style={styles.cardText}>
                {account.name} ({account.balance.amount}{' '}
                {account.balance.currency})
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </ScrollView>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance}</Text>
        <FAB
          style={styles.fab}
          icon="plus"
          color={theme.colors.onSecondary}
          onPress={() => {
            router.push('/home/add_record');
          }}
        />
      </View>
      {/* Floating Action Button */}
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    balanceContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    balanceText: {
      color: theme.colors.onBackground,
      ...theme.fonts.headlineSmall,
    },
    balanceAmount: {
      color: theme.colors.onBackground,
      ...theme.fonts.displayLarge,
    },
    navigationContainer: {},
    navigationCard: {
      height: 60,
      backgroundColor: theme.colors.primaryContainer,
      justifyContent: 'center',
      marginHorizontal: 10,
      paddingHorizontal: 20,
      borderRadius: theme.roundness,
    },
    cardText: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.bodyLarge,
    },
    cardAmount: {
      color: theme.colors.onPrimaryContainer,
      verticalAlign: 'middle',
      ...theme.fonts.bodyLarge,
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

export default IndexPage;
