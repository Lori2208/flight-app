import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = { children: React.ReactNode; style?: StyleProp<ViewStyle> };

export function Card({ children, style }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 16 },
});