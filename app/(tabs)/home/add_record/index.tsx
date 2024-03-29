import React, { useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Stack,
  router,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
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
  selectTargetAccount,
  setEditRecord,
} from 'features/recordForm/recordFormSlice';
import { useAppDispatch } from 'features/hooks';
import { Record, selectRecordById } from 'features/record/recordSlice';
import AmountInput from 'components/AmountInput';
import { JsStack } from 'layouts/js-stack';

export default function AddRecordPage() {
  const theme = useTheme();
  const recordType = useSelector(selectType);
  const styles = makeStyles(theme, recordType);
  const amount = useSelector(selectAmount);
  const currency = useSelector(selectCurrency);
  const type = useSelector(selectType);
  const recordAccount = useSelector(selectAccount);
  const recordTargetAccount = useSelector(selectTargetAccount);
  const recordCategory = useSelector(selectCategory);
  const canSaveRecord = useMemo(() => {
    const can = !!(Math.abs(amount) > 0 && recordAccount);
    if (type === 'TRANSFER') {
      return can && !!recordTargetAccount;
    }
    return can && !!recordCategory;
  }, [amount, recordAccount, recordCategory]);
  const dispatch = useAppDispatch();
  const { editId } = useLocalSearchParams<{ editId?: string }>();
  const recordTemplate = editId ? useSelector(selectRecordById(editId)) : null;
  useEffect(() => {
    if (recordTemplate) {
      dispatch(setEditRecord(recordTemplate));
    }
  }, [recordTemplate]);
  // Function to handle record submission
  const handleSave = () => {
    dispatch(saveRecord());
    router.push('/home');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.navigationContainer}>
          <JsStack.Screen
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
            items={
              [
                {
                  name: type === 'TRANSFER' ? 'From' : 'Account',
                  route: '/home/add_record/accounts',
                  icon: 'bank',
                  value: recordAccount?.name || '',
                  showRightIcon: true,
                  isRequired: true,
                },
                type === 'TRANSFER' && {
                  name: 'Target Account',
                  route: '/home/add_record/accounts?target=true',
                  icon: 'bank',
                  value: recordTargetAccount?.name || '',
                  showRightIcon: true,
                  isRequired: true,
                },
                type !== 'TRANSFER' && {
                  name: 'Select Category',
                  route: '/home/add_record/categories',
                  icon: recordCategory?.icon || 'help',
                  color: recordCategory?.color || theme.colors.primary,
                  value: recordCategory?.name || '',
                  showRightIcon: true,
                  isRequired: true,
                },
              ].filter(Boolean) as any[]
            }
          />

          <ListSection
            title="More Detail"
            items={[
              {
                name: 'Notes',
                route: '/home/add_record/notes',
                icon: 'note',
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
