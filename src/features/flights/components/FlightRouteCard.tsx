import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { formatDateFromDateTime, formatTime } from '@/utils/date';

type Props = { flight: Flight; duration: string };

export function FlightRouteCard({ flight, duration }: Props) {
  const { colors } = useAppTheme();

  return (
    <Card>
      <View style={styles.row}>
        <View>
          <Text style={[styles.time, { color: colors.text }]}>{formatTime(flight.departureTime)}</Text>
          <Text style={[styles.code, { color: colors.text }]}>{flight.origin}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {formatDateFromDateTime(flight.departureTime)}
          </Text>
        </View>

        <View style={styles.middle}>
          <Text style={[styles.duration, { color: colors.textSecondary }]}>{duration}</Text>
          <View style={styles.lineRow}>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Ionicons name="airplane" size={18} color={colors.primary} />
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>
        </View>

        <View style={styles.alignRight}>
          <Text style={[styles.time, { color: colors.text }]}>{formatTime(flight.arrivalTime)}</Text>
          <Text style={[styles.code, { color: colors.text }]}>{flight.destination}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {formatDateFromDateTime(flight.arrivalTime)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  time: { fontSize: 28, fontWeight: '700' },
  code: { fontSize: 16, fontWeight: '700', marginTop: 2 },
  date: { fontSize: 13, marginTop: 2 },
  middle: { flex: 1, alignItems: 'center', gap: 4 },
  duration: { fontSize: 13 },
  lineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'stretch' },
  line: { flex: 1, height: 1 },
  alignRight: { alignItems: 'flex-end' },
});