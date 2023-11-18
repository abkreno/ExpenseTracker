import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import ListSection from 'components/ListSection';
import {
  saveAccount,
  selectBalance,
  selectColor,
  selectName,
  selectType,
} from 'features/accountForm/accountFormSlice';
import { useAppDispatch } from 'features/hooks';
import { useSelector } from 'react-redux';
import Icon from 'components/Icon';

export default function AddAccount() {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const dispatch = useAppDispatch();
  const accountName = useSelector(selectName);
  const accountType = useSelector(selectType);
  const balance = useSelector(selectBalance);
  const color = useSelector(selectColor);
  // Function to handle record submission
  const handleSave = () => {
    dispatch(saveAccount());
    router.push('/home');
  };

  const canSaveAccount = useMemo(() => {
    return accountName && accountType && balance.currency;
  }, [accountName, accountType, balance.currency]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Stack.Screen
          options={{
            title: 'Add Account',
          }}
        />
        <ListSection
          title="General"
          items={[
            {
              name: 'Account Name',
              route: '/home/add_account/name',
              icon: 'account',
              showRightIcon: true,
              value: accountName,
            },
            {
              name: 'Account Type',
              route: '/home/add_account/type',
              icon: 'bank',
              showRightIcon: true,
              value: accountType,
            },
            {
              name: 'Initial Balance',
              route: '/home/add_account/initial_balance',
              icon: 'cash-multiple',
              showRightIcon: true,
              value: balance.amount.toString(),
            },
            {
              name: 'Currency',
              route: '/home/add_account/currencies',
              icon: 'currency-usd',
              showRightIcon: true,
              value: balance.currency,
            },
          ]}
        />

        <ListSection
          title="More Detail"
          items={[
            {
              name: 'Color',
              route: '/home/add_account/color',
              icon: () => <Icon name="circle" color={color} />,
              value: '',
            },
          ]}
        />
      </View>
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.onSecondary}
        onPress={handleSave}
        disabled={!canSaveAccount}
      >
        Save
      </Button>
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    navigationContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 0,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
    },
    topFormContainer: {
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
    buttonLabel: {
      ...theme.fonts.bodyLarge,
      color: theme.colors.onPrimary,
    },
    button: {
      width: '80%',
      alignSelf: 'center',
      marginBottom: 20,
      borderRadius: 20,
    },
  });
