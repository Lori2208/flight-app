import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AirportPicker } from './components/AirportPicker';

export function HomeScreen() {
  const [origin, setOrigin] = useState<string | null>('TIA');
  const [destination, setDestination] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <AirportPicker label="From" value={origin} onChange={setOrigin} excludeCode={destination} />
      <AirportPicker label="To" value={destination} onChange={setDestination} excludeCode={origin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
});