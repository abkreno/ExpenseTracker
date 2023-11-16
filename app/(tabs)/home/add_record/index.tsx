import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Stack, router } from 'expo-router';
import {
  Button,
  MD3Theme,
  SegmentedButtons,
  useTheme,
} from 'react-native-paper';
import ListSection from 'components/ListSection';
import { useSelector } from 'react-redux';
import {
  selectAccount,
  selectCategory,
  selectType,
  setType,
  setAmount,
  selectCurrency,
  selectAmount,
  selectNotes,
  saveRecord,
} from 'features/recordForm/recordFormSlice';
import { useAppDispatch } from 'features/hooks';
import { Record } from 'features/record/recordSlice';
import AmountInput from 'components/AmountInput';

export default function AddRecord() {
  const theme = useTheme();
  const recordType = useSelector(selectType);
  const styles = makeStyles(theme, recordType);
  const amount = useSelector(selectAmount);
  const currency = useSelector(selectCurrency);
  const type = useSelector(selectType);
  const recordAccount = useSelector(selectAccount);
  const recordCategory = useSelector(selectCategory);
  const canSaveRecord = useMemo(() => {
    return !!(Math.abs(amount) > 0 && recordAccount && recordCategory);
  }, [amount, recordAccount, recordCategory]);
  const dispatch = useAppDispatch();
  // Function to handle record submission
  const handleSave = () => {
    dispatch(saveRecord());
    router.push('/home');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.navigationContainer}>
          <Stack.Screen
            options={{
              title: 'Add Record',
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
              value={recordType}
              onValueChange={(value) =>
                dispatch(setType(value as Record['type']))
              }
              buttons={[
                {
                  value: 'EXPENSE',
                  label: 'Expense',
                  checkedColor: theme.colors.primary,
                  uncheckedColor: theme.colors.onPrimary,
                },
                {
                  value: 'INCOME',
                  label: 'Income',
                  checkedColor: theme.colors.primary,
                  uncheckedColor: theme.colors.onPrimary,
                },
                {
                  value: 'TRANSFER',
                  label: 'Transfer',
                  checkedColor: theme.colors.primary,
                  uncheckedColor: theme.colors.onPrimary,
                },
              ]}
            />
            <AmountInput
              amount={amount}
              currency={currency}
              type={type}
              onChange={(amount: number) => {
                dispatch(setAmount(amount));
              }}
              onCurrencyPress={() => {
                router.push('/home/add_record/currencies');
              }}
            />
          </View>
          <ListSection
            title="General"
            items={[
              {
                name: 'Select Account',
                route: '/home/add_record/accounts',
                iconName: 'bank',
                value: recordAccount?.name || '',
                showRightIcon: true,
                isRequired: true,
              },
              {
                name: 'Select Category',
                route: '/home/add_record/categories',
                iconName: recordCategory?.icon || 'help',
                color: recordCategory?.color || theme.colors.primary,
                value: recordCategory?.name || '',
                showRightIcon: true,
                isRequired: true,
              },
            ]}
          />

          <ListSection
            title="More Detail"
            items={[
              {
                name: 'Notes',
                route: '/home/add_record/notes',
                iconName: 'note',
                value: useSelector(selectNotes),
                showRightIcon: true,
              },
            ]}
          />
        </View>
        <Button
          style={styles.button}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          labelStyle={styles.buttonLabel}
          onPress={handleSave}
          disabled={!canSaveRecord}
        >
          Save
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const makeStyles = (theme: MD3Theme, type: Record['type']) =>
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
