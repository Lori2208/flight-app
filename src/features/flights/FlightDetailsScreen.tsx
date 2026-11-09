import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import type { FlightDetailsParams } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import { formatDateFromDateTime, formatDuration, formatTime } from '@/utils/date';
import { useGetFlightQuery } from './flightsApi';
import { getStatusColor } from './flightStatus';

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

export function FlightDetailsScreen() {
  const { params } = useRoute<RouteProp<{ FlightDetails: FlightDetailsParams }, 'FlightDetails'>>();
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  const { data: flight, isLoading, isError, refetch } = useGetFlightQuery(params.flightId);

  // Show the flight number in the header once it's loaded
  useLayoutEffect(() => {
    if (flight) navigation.setOptions({ title: flight.flightNumber });
  }, [navigation, flight]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !flight) {
    return (
      <Placeholder title="Couldn't load this flight">
        <Button title="Try again" onPress={refetch} color={colors.primary} />
      </Placeholder>
    );
  }

  const statusColor = getStatusColor(flight.status, colors);
  const duration = formatDuration(flight.departureTime, flight.arrivalTime);
  const cardStyle = [styles.card, { backgroundColor: colors.card, borderColor: colors.border }];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={cardStyle}>
        <View style={styles.titleRow}>
          <View style={styles.flex}>
            <Text style={[styles.airline, { color: colors.textSecondary }]}>{flight.airline}</Text>
            <Text style={[styles.flightNumber, { color: colors.text }]}>{flight.flightNumber}</Text>
          </View>
          <View style={[styles.statusPill, { borderColor: statusColor }]}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{flight.status}</Text>
          </View>
        </View>
      </View>

      <View style={cardStyle}>
        <View style={styles.routeRow}>
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
      </View>

      <View style={cardStyle}>
        <InfoRow icon="airplane-outline" label="Aircraft" value={flight.aircraft} />
        <InfoRow icon="business-outline" label="Terminal" value={flight.terminal} />
        <InfoRow icon="enter-outline" label="Gate" value={flight.gate} />
        <InfoRow icon="time-outline" label="Duration" value={duration} />
        <InfoRow icon="pricetag-outline" label="Price" value={`€${flight.price}`} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 16, gap: 16 },
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16 },
  flex: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  airline: { fontSize: 14, fontWeight: '600' },
  flightNumber: { fontSize: 26, fontWeight: '700' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '700' },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  time: { fontSize: 28, fontWeight: '700' },
  code: { fontSize: 16, fontWeight: '700', marginTop: 2 },
  date: { fontSize: 13, marginTop: 2 },
  middle: { flex: 1, alignItems: 'center', gap: 4 },
  duration: { fontSize: 13 },
  lineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'stretch' },
  line: { flex: 1, height: 1 },
  alignRight: { alignItems: 'flex-end' },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: { flex: 1, fontSize: 15 },
  infoValue: { fontSize: 15, fontWeight: '600' },
});