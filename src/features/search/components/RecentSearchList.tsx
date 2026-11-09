import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import type { RecentSearch } from '@/types';
import { formatShortDate } from '@/utils/date';
import { findAirport } from '../airports';

type Props = {
  searches: RecentSearch[];
  isLoading: boolean;
  isError: boolean;
  onSelect: (search: RecentSearch) => void;
};

export function RecentSearchList({ searches, isLoading, isError, onSelect }: Props) {
  const { colors } = useAppTheme();

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator color={colors.primary} style={styles.status} />;
    }
    if (isError) {
      return (
        <Text style={[styles.status, { color: colors.textSecondary }]}>
       {"Couldn't load recent searches"}
        </Text>
      );
    }
    if (searches.length === 0) {
      return (
        <Text style={[styles.status, { color: colors.textSecondary }]}>
          Your recent searches will appear here
        </Text>
      );
    }

    return searches.map((search) => {
      const from = findAirport(search.origin)?.city ?? search.origin;
      const to = findAirport(search.destination)?.city ?? search.destination;

      return (
        <Pressable
          key={search.id}
          style={({ pressed }) => [
            styles.row,
            { borderBottomColor: colors.border },
            pressed && styles.pressed,
          ]}
          onPress={() => onSelect(search)}
          accessibilityRole="button"
          accessibilityLabel={`Use search from ${from} to ${to}`}
        >
          <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
          <View style={styles.rowText}>
            <Text style={[styles.route, { color: colors.text }]}>
              {search.origin} → {search.destination} · {formatShortDate(search.departureDate)} –{' '}
              {formatShortDate(search.arrivalDate)}
            </Text>
            <Text style={[styles.cities, { color: colors.textSecondary }]}>
              {from} to {to}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      );
    });
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Recent searches</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16 },
  title: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  status: { paddingVertical: 16, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressed: { opacity: 0.6 },
  rowText: { flex: 1 },
  route: { fontSize: 15, fontWeight: '600' },
  cities: { fontSize: 13, marginTop: 2 },
});