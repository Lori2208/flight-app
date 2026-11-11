import { StyleSheet, Text } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = { count: number };

export function FavoritesHeader({ count }: Props) {
  const { colors } = useAppTheme();

  return (
    <Text style={[styles.header, { color: colors.textSecondary }]}>
      {count} saved {count === 1 ? 'flight' : 'flights'}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 14, marginBottom: 12 },
});