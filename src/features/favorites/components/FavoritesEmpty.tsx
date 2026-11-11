import { Button, StyleSheet, Text } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = { onSearchPress: () => void };

export function FavoritesEmpty({ onSearchPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <Placeholder title="No favorite flights yet">
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Tap the heart on a flight to save it here.
      </Text>
      <Button title="Search flights" onPress={onSearchPress} color={colors.primary} />
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  text: { textAlign: 'center' },
});