import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { Stack, router } from 'expo-router';
import {
  Button,
  Chip,
  MD3Theme,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';
import ListSection from 'components/ListSection';
import { useSelector } from 'react-redux';
import {
  selectCanSaveRecord,
  selectAccount,
  selectCategory,
  selectType,
  setType,
  setAmount,
  selectCurrency,
  selectAmount,
} from 'features/recordForm/recordFormSlice';
import { useAppDispatch } from 'features/hooks';
import { Record } from 'features/record/recordSlice';
import AmountInput from 'components/AmountInput';

export default function AddRecord() {
  const theme = useTheme();
  const recordType = useSelector(selectType);
  const styles = makeStyles(theme, recordType);
  const recordAccount = useSelector(selectAccount);
  const recordCategory = useSelector(selectCategory);
  const canSaveRecord = useSelector(selectCanSaveRecord);
  const dispatch = useAppDispatch();
  // Function to handle record submission
  const handleSave = () => {
    // Handle adding the record to your data store or API
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
              amount={useSelector(selectAmount)}
              currency={useSelector(selectCurrency)}
              type={useSelector(selectType)}
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
                icon: 'bank',
                value: recordAccount?.name || '',
                showRightIcon: true,
              },
              {
                name: 'Select Category',
                route: '/home/add_record/categories',
                icon: 'circle',
                value: recordCategory?.name || '',
                showRightIcon: true,
              },
            ]}
          />

          <ListSection
            title="More Detail"
            items={[
              {
                name: 'Note',
                route: '/',
                icon: 'note',
                value: '',
              },
            ]}
          />
        </View>
        <Button
          style={styles.button}
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
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
    button: {
      width: '80%',
      alignSelf: 'center',
      marginBottom: 20,
      borderRadius: theme.roundness,
    },
  });
