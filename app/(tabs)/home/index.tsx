import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { useSelector } from 'react-redux';
import {
  loadAccountsAsync,
  selectAccounts,
  selectTotalBalance,
} from '../../../features/account/accountSlice';
import { useAppDispatch } from '../../../hooks';
import { FAB } from 'react-native-paper';
// import { FAB } from 'react-native-paper';

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const accounts = useSelector(selectAccounts);
  const totalBalance = useSelector(selectTotalBalance);
  useEffect(() => {
    dispatch(loadAccountsAsync());
  });
  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        {accounts.map((account, index) => (
          <Link
            key={index}
            style={styles.navigationCard}
            href={`/account/${account.id}`}
          >
            <Text style={styles.cardText}>{account.name}</Text>
          </Link>
        ))}
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance}</Text>
      </View>
      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          router.push('/home/add_record');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balanceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 24,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navigationCard: {
    width: '48%',
    height: 150,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    backgroundColor: 'lightgreen',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
});

export default IndexPage;
