import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

export function TextField({ style, ...rest }: TextInputProps) {
  const { colors } = useAppTheme();

  return (
    <TextInput
      placeholderTextColor={colors.textSecondary}
      {...rest}
      style={[
        styles.input,
        { borderColor: colors.border, backgroundColor: colors.inputBackground, color: colors.text },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});