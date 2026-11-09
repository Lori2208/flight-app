import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { formatDuration, formatTime } from '@/utils/date';
import { getStatusColor } from '../flightStatus';

type Props = {
  flight: Flight;
  onPress: (flight: Flight) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (flight: Flight) => void;
};

function FlightCardComponent({ flight, onPress, isFavorite = false, onToggleFavorite }: Props) {
  const { colors } = useAppTheme();
  const statusColor = getStatusColor(flight.status, colors);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(flight)}
      accessibilityRole="button"
      accessibilityLabel={`${flight.airline} ${flight.flightNumber}, ${formatTime(flight.departureTime)} to ${formatTime(flight.arrivalTime)}, ${flight.status}`}
    >
      <View style={styles.topRow}>
        <Text style={[styles.airline, { color: colors.text }]} numberOfLines={1}>
          {flight.airline} · {flight.flightNumber}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>€{flight.price}</Text>
        {onToggleFavorite && (
          <Pressable
            onPress={() => onToggleFavorite(flight)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? colors.danger : colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.timesRow}>
        <View>
          <Text style={[styles.time, { color: colors.text }]}>{formatTime(flight.departureTime)}</Text>
          <Text style={[styles.code, { color: colors.textSecondary }]}>{flight.origin}</Text>
        </View>

        <View style={styles.middle}>
          <Text style={[styles.duration, { color: colors.textSecondary }]}>
            {formatDuration(flight.departureTime, flight.arrivalTime)}
          </Text>
          <View style={styles.lineRow}>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Ionicons name="airplane" size={16} color={colors.primary} />
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>
        </View>

        <View style={styles.alignRight}>
          <Text style={[styles.time, { color: colors.text }]}>{formatTime(flight.arrivalTime)}</Text>
          <Text style={[styles.code, { color: colors.textSecondary }]}>{flight.destination}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.dot, { backgroundColor: statusColor }]} />
        <Text style={[styles.status, { color: statusColor }]}>{flight.status}</Text>
      </View>
    </Pressable>
  );
}

export const FlightCard = memo(FlightCardComponent);

const styles = StyleSheet.create({
  card: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 12 },
  pressed: { opacity: 0.7 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  airline: { flex: 1, fontSize: 15, fontWeight: '600' },
  price: { fontSize: 17, fontWeight: '700' },
  timesRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  time: { fontSize: 22, fontWeight: '700' },
  code: { fontSize: 13, fontWeight: '600' },
  middle: { flex: 1, alignItems: 'center', gap: 4 },
  duration: { fontSize: 12 },
  lineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'stretch' },
  line: { flex: 1, height: 1 },
  alignRight: { alignItems: 'flex-end' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  status: { fontSize: 13, fontWeight: '600' },
});