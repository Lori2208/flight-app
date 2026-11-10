import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  icon,
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  const { colors } = useAppTheme();
  const accent = destructive ? colors.danger : colors.primary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel} accessibilityLabel="Close dialog">
        <Pressable style={[styles.card, { backgroundColor: colors.card }]}>
          {icon && (
            <View style={[styles.iconCircle, { backgroundColor: `${accent}22` }]}>
              <Ionicons name={icon} size={28} color={accent} />
            </View>
          )}

          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                { borderColor: colors.border },
                pressed && styles.pressed,
              ]}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: accent },
                pressed && styles.pressed,
              ]}
              onPress={onConfirm}
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, { color: colors.onPrimary }]}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 19, fontWeight: '700', textAlign: 'center' },
  message: { fontSize: 15, lineHeight: 21, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 16, alignSelf: 'stretch' },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelButton: { borderWidth: 1 },
  pressed: { opacity: 0.75 },
  buttonText: { fontSize: 16, fontWeight: '600' },
});