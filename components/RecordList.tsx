import { ScrollView } from 'react-native-gesture-handler';
import RecordListItem from './RecordListItem';
import { Record } from 'features/record/recordSlice';
import { router } from 'expo-router';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import { useAppDispatch } from 'features/hooks';
import { setEditRecord } from 'features/recordForm/recordFormSlice';

export default function RecordList({
  title = 'Recent Records',
  records,
  styles,
}: {
  title?: string;
  records: Record[];
  styles?: any;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: theme.colors.elevation.level2,
        paddingTop: 16,
        paddingBottom: 0,
        ...styles,
      }}
    >
      <Text
        style={{
          ...theme.fonts.titleSmall,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {title}
      </Text>
      <Divider style={{ backgroundColor: theme.colors.onPrimaryContainer }} />
      <ScrollView>
        {records.length ? (
          records.map((record, index) => (
            <RecordListItem
              key={index}
              record={record}
              onPress={() => {
                router.push('/home/add_record?editId=' + record.id);
              }}
              showDivider={index !== records.length - 1}
            />
          ))
        ) : (
          <View style={{ height: 160 }}>
            <Text style={{ ...theme.fonts.bodyLarge, padding: 16 }}>
              No records yet
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
