import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

export function InfoRow({ icon, label, value }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: { flex: 1, fontSize: 15 },
  value: { fontSize: 15, fontWeight: '600' },
});