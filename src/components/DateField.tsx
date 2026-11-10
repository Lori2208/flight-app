import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import { formatLongDate, fromISODate, toISODate } from '@/utils/date';
import { SelectField } from './SelectField';

type Props = {
  label: string;
  value: string; // "YYYY-MM-DD"
  onChange: (iso: string) => void;
  minimumDate?: string;
};

export function DateField({ label, value, onChange, minimumDate }: Props) {
  const { dark } = useAppTheme();
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (event.type === 'set' && date) onChange(toISODate(date));
  };

  return (
    <View style={styles.wrapper}>
      <SelectField
        label={label}
        value={formatLongDate(value)}
        onPress={() => setShow((prev) => !prev)}
      />

      {show && (
        <DateTimePicker
          value={fromISODate(value)}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={minimumDate ? fromISODate(minimumDate) : undefined}
          onChange={handleChange}
          themeVariant={dark ? 'dark' : 'light'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
