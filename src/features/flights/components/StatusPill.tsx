import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import type { FlightStatus } from '@/types';
import { getStatusColor } from '../helper/flightStatus';

type Props = { status: FlightStatus };

export function StatusPill({ status }: Props) {
  const { colors } = useAppTheme();
  const color = getStatusColor(status, colors);

  return (
    <View style={[styles.pill, { borderColor: color }]} accessibilityLabel={`Status: ${status}`}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { fontSize: 14, fontWeight: '700' },
});