import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import { addDays, toISODate } from '@/utils/date';
import { AirportPicker } from './components/AirportPicker';
import { DateField } from '@/components/DateField';
import { validateSearch } from './validation';

export function HomeScreen({ navigation }: HomeScreenProps<'Home'>) {
  const { colors } = useAppTheme();
  const today = toISODate(new Date());

  const [origin, setOrigin] = useState<string | null>('TIA');
  const [destination, setDestination] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState(() => toISODate(addDays(new Date(), 7)));
  const [arrivalDate, setArrivalDate] = useState(() => toISODate(addDays(new Date(), 10)));
  const [submitted, setSubmitted] = useState(false);

  const error = validateSearch({ origin, destination, departureDate, arrivalDate });

  const handleDepartureChange = (iso: string) => {
    setDepartureDate(iso);
    if (arrivalDate < iso) setArrivalDate(iso); // keep arrival valid
  };

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = () => {
    setSubmitted(true);
    if (error || !origin || !destination) return;

    navigation.navigate('SearchResults', {
      search: { origin, destination, departureDate, arrivalDate },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View>
          <AirportPicker
            label="From"
            value={origin}
            onChange={setOrigin}
            excludeCode={destination}
          />
          <View style={styles.gap} />
          <AirportPicker
            label="To"
            value={destination}
            onChange={setDestination}
            excludeCode={origin}
          />

          <Pressable
            style={[styles.swap, { backgroundColor: colors.primary }]}
            onPress={handleSwap}
            accessibilityLabel="Swap origin and destination"
            hitSlop={8}
          >
            <Ionicons name="swap-vertical" size={20} color={colors.onPrimary} />
          </Pressable>
        </View>

        <View style={styles.row}>
          <DateField
            label="Departure"
            value={departureDate}
            onChange={handleDepartureChange}
            minimumDate={today}
          />
          <DateField
            label="Arrival"
            value={arrivalDate}
            onChange={setArrivalDate}
            minimumDate={departureDate}
          />
        </View>

        {submitted && error && (
          <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={18} color={colors.onPrimary} />
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Search flights</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 12 },
  gap: { height: 8 },
  swap: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', gap: 12 },
  error: { fontSize: 14 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
});