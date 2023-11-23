import { Record } from 'features/record/recordSlice';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function getRecordAmountColor(type: Record['type'], dark = false) {
  switch (type) {
    case 'EXPENSE':
      return dark ? 'red' : 'lightcoral';
    case 'INCOME':
      return dark ? 'green' : 'lightgreen';
    case 'TRANSFER':
      return dark ? 'black' : 'white';
    default:
      return 'white';
  }
}

export default function AmountInput({
  amount,
  currency,
  type,
  onChange,
  onCurrencyPress,
  disableCurrency,
}: {
  amount: number;
  currency: string;
  type: Record['type'];
  onChange: (amount: number) => void;
  onCurrencyPress: () => void;
  disableCurrency?: boolean;
}) {
  const [amountStr, setAmountStr] = useState(`${amount}`);
  const [selection, setSelection] = useState({
    start: amountStr.length,
    end: amountStr.length,
  });
  const theme = useTheme();
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setAmountStr(`${amount}`);
    setSelection({
      start: `${amount}`.length,
      end: `${amount}`.length,
    });
  }, [amount]);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // update sign
    const sign = type === 'EXPENSE' ? '-' : type === 'INCOME' ? '+' : '';
    setAmountStr(sign + amountStr.replace(/[^0-9.,]/g, ''));
  }, [type]);

  const formatNumber = (numString: string): string => {
    // Remove leading zeros
    numString = numString.replace(/^0+/, '');
    const sign = type === 'EXPENSE' ? '-' : type === 'INCOME' ? '+' : '';
    if (numString === '') return sign + '0'; // If empty, set to "0"
    // Format with commas
    return sign + numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const amountFontSize = useMemo(() => {
    if (amountStr.length > 11)
      return theme.fonts.displayLarge.fontSize - (amountStr.length - 11) * 3;

    return theme.fonts.displayLarge.fontSize;
  }, [amountStr.length]);

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    let newValue = text.replace(/[^0-9.]/g, ''); // Remove any non-numeric characters
    // value shouldn't be more than 999999999999
    if (newValue.length > 12) return;
    if (newValue === '') newValue = '0'; // If empty, set to "0"
    if (newValue === '0') newValue = ''; // If 0, empty string (will be formatted later)
    if (newValue.indexOf('.') >= 0) {
      // If contains a decimal
      const parts = newValue.split('.'); // Split into parts
      parts[0] = formatNumber(parts[0]); // Format the whole number part
      parts[1] = parts[1].slice(0, 2); // Truncate the decimals to 2 characters
      newValue = parts.join('.'); // Rejoin
    } else {
      // If no decimal
      newValue = formatNumber(newValue); // Format the whole number part
    }
    setAmountStr(newValue);
    setSelection({ start: newValue.length, end: newValue.length }); // Update cursor position
    onChange(parseFloat(newValue.replace(/,/g, '')));
  };
  return (
    <Pressable
      style={{
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        gap: 5,
      }}
      onPress={() => textInputRef.current?.focus()}
    >
      <Pressable
        onPress={onCurrencyPress}
        style={{
          backgroundColor: disableCurrency
            ? theme.colors.onPrimaryContainer
            : theme.colors.onPrimary,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
        disabled={disableCurrency}
      >
        <Text
          style={{
            ...theme.fonts.titleMedium,
            color: theme.colors.primary,
            textAlign: 'center',
          }}
        >
          {currency}
        </Text>
      </Pressable>
      <TextInput
        keyboardType="numeric"
        value={amountStr}
        style={{ height: 0, opacity: 0, flex: 0, width: 0 }} // Make the TextInput invisible
        onChange={handleChange}
        selection={selection}
        caretHidden={true}
        ref={textInputRef}
      />
      <Text
        style={{
          fontSize: amountFontSize,
          textAlign: 'right',
          color: getRecordAmountColor(type),
        }}
      >
        {amountStr}
      </Text>
    </Pressable>
  );
}
