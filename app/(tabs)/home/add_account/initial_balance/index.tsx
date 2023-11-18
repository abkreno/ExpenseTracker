import AmountInput from 'components/AmountInput';
import { Stack, router } from 'expo-router';
import {
  selectBalance,
  selectInitialBalance,
  setBalanceAmount,
  setInitialBalance,
} from 'features/accountForm/accountFormSlice';
import { useAppDispatch } from 'features/hooks';
import { Record } from 'features/record/recordSlice';
import { setAmount } from 'features/recordForm/recordFormSlice';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, SegmentedButtons, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function AddAccountInitialBalance() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const initialBalance = useSelector(selectInitialBalance);
  const currency = useSelector(selectBalance).currency;
  const [type, setType] = useState<Record['type']>(
    initialBalance < 0 ? 'EXPENSE' : 'INCOME'
  );
  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Stack.Screen
          options={{
            title: 'Add Account',
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
              color: theme.colors.onPrimary,
            },
          }}
        />
        <View style={styles.topFormContainer}>
          <SegmentedButtons
            value={type}
            onValueChange={(value) => {
              setType(value as Record['type']);
              const amount = initialBalance * (value === 'EXPENSE' ? -1 : 1);
              dispatch(setInitialBalance(amount));
              dispatch(setBalanceAmount(amount));
            }}
            buttons={[
              {
                value: 'INCOME',
                label: 'Positive',
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.onPrimary,
              },
              {
                value: 'EXPENSE',
                label: 'Negative',
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.onPrimary,
              },
            ]}
          />
          <AmountInput
            amount={initialBalance}
            currency={currency}
            type={type}
            onChange={(amount: number) => {
              setType(amount < 0 ? 'EXPENSE' : 'INCOME');
              dispatch(setInitialBalance(amount));
              dispatch(setBalanceAmount(amount));
            }}
            onCurrencyPress={() => {}}
            disableCurrency
          />
        </View>
      </View>
    </View>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
    },
    navigationContainer: {
      flex: 1,
    },
    topFormContainer: {
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
  });
