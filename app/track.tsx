import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TrackScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Sample account and category data
  const accounts = ['Account 1', 'Account 2', 'Account 3'];
  const categories = ['Category A', 'Category B', 'Category C'];

  // Function to handle record submission
  const handleTrack = () => {
    // Handle adding the record to your data store or API
    console.log('Selected Account:', selectedAccount);
    console.log('Selected Category:', selectedCategory);
    console.log('Amount:', amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Account:</Text>
      <Picker
        selectedValue={selectedAccount}
        onValueChange={(itemValue, itemIndex) => setSelectedAccount(itemValue)}
      >
        {accounts.map((account, index) => (
          <Picker.Item key={index} label={account} value={account} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAmount(text)}
        value={amount}
        keyboardType="numeric"
      />

      <Button title="Add Record" onPress={handleTrack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default TrackScreen;