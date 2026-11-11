import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import type { FlightDetailsParams } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import { formatDuration } from '@/utils/date';
import { FlightHeaderCard } from './components/FlightHeaderCard';
import { FlightInfoCard } from './components/FlightInfoCard';
import { FlightRouteCard } from './components/FlightRouteCard';
import { useGetFlightQuery } from './api/flightsApi';

export function FlightDetailsScreen() {
  const { params } = useRoute<RouteProp<{ FlightDetails: FlightDetailsParams }, 'FlightDetails'>>();
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  const { data: flight, isLoading, isError, refetch } = useGetFlightQuery(params.flightId);

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

  const duration = formatDuration(flight.departureTime, flight.arrivalTime);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlightHeaderCard flight={flight} />
      <FlightRouteCard flight={flight} duration={duration} />
      <FlightInfoCard flight={flight} duration={duration} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 16, gap: 16 },
});