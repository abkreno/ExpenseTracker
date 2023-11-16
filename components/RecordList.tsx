import { ScrollView } from 'react-native-gesture-handler';
import RecordListItem from './RecordListItem';
import { Record } from 'features/record/recordSlice';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';

export default function RecordList({
  title = 'Recent Records',
  records,
}: {
  title?: string;
  records: Record[];
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: theme.colors.primaryContainer,
        padding: 16,
        paddingBottom: 0,
      }}
    >
      <Text
        style={{
          ...theme.fonts.titleSmall,
          paddingBottom: 16,
        }}
      >
        {title}
      </Text>
      <Divider style={{ backgroundColor: theme.colors.onPrimaryContainer }} />
      <ScrollView>
        {records.map((record, index) => (
          <RecordListItem
            key={index}
            record={record}
            onPress={() => router.push(`${record.id}`)}
            showDivider={index !== records.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
}
