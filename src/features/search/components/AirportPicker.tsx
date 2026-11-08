import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/theme/useAppTheme';
import { findAirport, searchAirports } from '../airports';

type Props = {
  label: string;
  value: string | null;
  onChange: (code: string) => void;
  excludeCode?: string | null;
};

export function AirportPicker({ label, value, onChange, excludeCode }: Props) {
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = findAirport(value);
  const results = useMemo(() => searchAirports(query, excludeCode), [query, excludeCode]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <Pressable
        style={[styles.field, { borderColor: colors.border, backgroundColor: colors.inputBackground }]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected ? selected.city : 'not selected'}`}
      >
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>{label}</Text>
        {selected ? (
          <Text style={[styles.fieldValue, { color: colors.text }]}>
            {selected.code} – {selected.city}
          </Text>
        ) : (
          <Text style={[styles.fieldValue, { color: colors.textSecondary }]}>Select airport</Text>
        )}
      </Pressable>

      <Modal visible={open} animationType="slide" onRequestClose={close}>
        <SafeAreaProvider>
          <SafeAreaView style={[styles.modal, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{label}</Text>
              <Pressable onPress={close} hitSlop={12} accessibilityLabel="Close">
                <Ionicons name="close" size={26} color={colors.text} />
              </Pressable>
            </View>

            <TextInput
              style={[
                styles.search,
                { borderColor: colors.border, backgroundColor: colors.inputBackground, color: colors.text },
              ]}
              placeholder="Search city or airport code"
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              autoFocus
              autoCorrect={false}
            />

            <FlatList
              data={results}
              keyExtractor={(airport) => airport.code}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.row,
                    { borderBottomColor: colors.border },
                    pressed && { opacity: 0.6 },
                  ]}
                  onPress={() => {
                    onChange(item.code);
                    close();
                  }}
                >
                  <Text style={[styles.code, { color: colors.primary }]}>{item.code}</Text>
                  <View style={styles.rowText}>
                    <Text style={[styles.city, { color: colors.text }]}>{item.city}</Text>
                    <Text style={[styles.name, { color: colors.textSecondary }]}>{item.name}</Text>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={[styles.empty, { color: colors.textSecondary }]}>No airports found</Text>
              }
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, gap: 2 },
  fieldLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  fieldValue: { fontSize: 17, fontWeight: '600' },
  modal: { flex: 1, paddingHorizontal: 16 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  modalTitle: { fontSize: 20, fontWeight: '700' },
  search: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  code: { fontSize: 18, fontWeight: '700', width: 48 },
  rowText: { flex: 1 },
  city: { fontSize: 16, fontWeight: '600' },
  name: { fontSize: 13 },
  empty: { textAlign: 'center', marginTop: 24 },
});