import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = { title: string; children?: React.ReactNode };

export function Placeholder({ title, children }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
});