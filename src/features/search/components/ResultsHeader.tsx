import { StyleSheet, Text } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import { formatLongDate } from '@/utils/date';

type Props = {
  count: number;
  departureDate: string;
};

export function ResultsHeader({ count, departureDate }: Props) {
  const { colors } = useAppTheme();

  return (
    <Text style={[styles.header, { color: colors.textSecondary }]}>
      {count} {count === 1 ? 'flight' : 'flights'} · {formatLongDate(departureDate)}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 14, marginBottom: 12 },
});