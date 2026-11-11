import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { StatusPill } from './StatusPill';

type Props = { flight: Flight };

export function FlightHeaderCard({ flight }: Props) {
  const { colors } = useAppTheme();

  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[styles.airline, { color: colors.textSecondary }]}>{flight.airline}</Text>
          <Text style={[styles.flightNumber, { color: colors.text }]}>{flight.flightNumber}</Text>
        </View>
        <StatusPill status={flight.status} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flex: { flex: 1 },
  airline: { fontSize: 14, fontWeight: '600' },
  flightNumber: { fontSize: 26, fontWeight: '700' },
});