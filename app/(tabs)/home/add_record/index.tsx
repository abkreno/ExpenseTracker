import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import ListSection from 'components/ListSection';

const RecordCreate = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  // Function to handle record submission
  const handleSave = () => {
    // Handle adding the record to your data store or API
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Stack.Screen
          options={{
            title: 'Add Record',
          }}
        />
        <ListSection
          title="General"
          items={[
            {
              name: 'Select Account',
              route: '/home/add_record/accounts',
              icon: 'bank',
              value: '',
              showRightIcon: true,
            },
            {
              name: 'Select Category',
              route: '/home/add_record/categories',
              icon: 'circle',
              value: '',
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
      >
        Save
      </Button>
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    navigationContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 0,
      paddingVertical: 20,
      backgroundColor: theme.colors.background,
    },
    button: {
      width: '80%',
      alignSelf: 'center',
      marginBottom: 20,
      borderRadius: theme.roundness,
    },
  });

export default RecordCreate;
