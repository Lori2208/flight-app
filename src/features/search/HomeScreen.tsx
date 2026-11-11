import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '@/app/hooks';
import { DateField } from '@/components/DateField';
import { selectCurrentUser } from '@/features/auth/store/authSlice';
import type { HomeScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import type { RecentSearch } from '@/types';
import { addDays, toISODate } from '@/utils/date';
import { AirportPicker } from './components/AirportPicker';
import { RecentSearchList } from './components/RecentSearchList';
import { useAddRecentSearchMutation, useGetRecentSearchesQuery } from './api/recentSearchesApi';
import { validateSearch } from './helper/validation';

export function HomeScreen({ navigation }: HomeScreenProps<'Home'>) {
  const { colors } = useAppTheme();
  const today = toISODate(new Date());

  const user = useAppSelector(selectCurrentUser);
  const {
    data: recentSearches = [],
    isLoading: isLoadingRecent,
    isError: isRecentError,
  } = useGetRecentSearchesQuery(user?.id ?? skipToken);
  const [addRecentSearch] = useAddRecentSearchMutation();

  const [origin, setOrigin] = useState<string | null>('TIA');
  const [destination, setDestination] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState(() => toISODate(addDays(new Date(), 7)));
  const [arrivalDate, setArrivalDate] = useState(() => toISODate(addDays(new Date(), 10)));
  const [submitted, setSubmitted] = useState(false);

  const isSubmittingRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      isSubmittingRef.current = false;
    }, []),
  );

  const error = validateSearch({ origin, destination, departureDate, arrivalDate });

  const handleDepartureChange = (iso: string) => {
    setDepartureDate(iso);
    if (arrivalDate < iso) setArrivalDate(iso); // keep arrival valid
  };

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };
  const handleSelectRecent = (search: RecentSearch) => {
    setOrigin(search.origin);
    setDestination(search.destination);

    // Only reuse the dates if they're not in the past
    if (search.departureDate >= today) {
      setDepartureDate(search.departureDate);
      setArrivalDate(search.arrivalDate);
    }

    setSubmitted(false);
  };

  const handleSearch = () => {
    setSubmitted(true);
    if (error || !origin || !destination) return;
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const search = { origin, destination, departureDate, arrivalDate };

    if (user) {
      addRecentSearch({ ...search, userId: user.id })
        .unwrap()
        .catch((err) => console.warn('Saving recent search failed:', err));
    }

    navigation.navigate('SearchResults', { search });
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
            pressed && styles.pressed,
          ]}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={18} color={colors.onPrimary} />
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Search flights</Text>
        </Pressable>
      </View>
      <RecentSearchList
        searches={recentSearches}
        isLoading={isLoadingRecent}
        isError={isRecentError}
        onSelect={handleSelectRecent}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, paddingBottom: 32  },
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
  pressed: { opacity: 0.8 },
  buttonText: { fontSize: 16, fontWeight: '600' },
});
