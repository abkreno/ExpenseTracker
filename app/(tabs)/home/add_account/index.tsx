import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import ListSection from 'components/ListSection';
import { saveAccount } from 'features/accountForm/accountFormSlice';
import { useAppDispatch } from 'features/hooks';

export default function AddAccount() {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const dispatch = useAppDispatch();
  // Function to handle record submission
  const handleSave = () => {
    dispatch(saveAccount());
    router.push('/home');
  };

  const canSaveAccount = useMemo(() => {
    return true;
  }, []);

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
              route: '/',
              iconName: 'account',
              value: '',
            },
            {
              name: 'Account Type',
              route: '/',
              iconName: 'account',
              value: '',
            },
            {
              name: 'Initial Balance',
              route: '/',
              iconName: 'account',
              value: '',
            },
            {
              name: 'Currency',
              route: '/',
              iconName: 'account',
              value: '',
            },
          ]}
        />

        <ListSection
          title="More Detail"
          items={[
            {
              name: 'Color',
              route: '/',
              iconName: 'account',
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
