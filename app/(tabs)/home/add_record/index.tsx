import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { List } from 'react-native-paper';

const RecordCreate = () => {
  // Function to handle record submission
  const handleSave = () => {
    // Handle adding the record to your data store or API
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Add Record',
        }}
      />
      <List.Section title="General">
        <List.Item
          title="Select Account"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Select Category"
          onPress={() => router.push('/home/add_record/categories')}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Amount"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>
      <List.Section title="More Detail">
        <List.Item
          title="Note"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default RecordCreate;
