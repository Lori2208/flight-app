import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = {
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SelectField({ label, value, placeholder = 'Select', onPress, style }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.field,
        { borderColor: colors.border, backgroundColor: colors.inputBackground },
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value ?? placeholder}`}
    >
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text
        style={[styles.value, { color: value ? colors.text : colors.textSecondary }]}
        numberOfLines={1}
      >
        {value ?? placeholder}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, gap: 2 },
  pressed: { opacity: 0.7 },
  label: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: 16, fontWeight: '600' },
});