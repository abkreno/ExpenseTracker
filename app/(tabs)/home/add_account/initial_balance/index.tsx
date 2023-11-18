import AmountInput from 'components/AmountInput';
import { Stack, router } from 'expo-router';
import { Account } from 'features/account/accountSlice';
import {
  selectBalance,
  selectInitialBalance,
  setBalanceAmount,
  setInitialBalance,
} from 'features/accountForm/accountFormSlice';
import { useAppDispatch } from 'features/hooks';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, SegmentedButtons, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function AddAccountInitialBalance() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const initialBalance = useSelector(selectInitialBalance);
  const currency = useSelector(selectBalance).currency;
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
            value={initialBalance.type}
            onValueChange={(value) => {
              const type = value as Account['initialBalance']['type'];
              dispatch(setInitialBalance({ ...initialBalance, type }));
              const sign = type === 'POSITIVE' ? 1 : -1;
              dispatch(setBalanceAmount(sign * initialBalance.amount));
            }}
            buttons={[
              {
                value: 'POSITIVE',
                label: 'Positive',
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.onPrimary,
              },
              {
                value: 'NEGATIVE',
                label: 'Negative',
                checkedColor: theme.colors.primary,
                uncheckedColor: theme.colors.onPrimary,
              },
            ]}
          />
          <AmountInput
            amount={initialBalance.amount}
            currency={currency}
            type={initialBalance.type === 'POSITIVE' ? 'INCOME' : 'EXPENSE'}
            onChange={(amount: number) => {
              dispatch(
                setInitialBalance({
                  ...initialBalance,
                  amount: Math.abs(amount),
                })
              );
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
