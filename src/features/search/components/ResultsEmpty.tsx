import { StyleSheet, Text } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import { useAppTheme } from '@/theme/useAppTheme';

export function ResultsEmpty() {
  const { colors } = useAppTheme();

  return (
    <Placeholder title="No flights found">
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Try another date or route.
      </Text>
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  text: { textAlign: 'center' },
});