import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { MoreScreenProps, MoreStackParamList } from '@/navigation/types';

type MenuItem = {
  route: Exclude<keyof MoreStackParamList, 'More'>;
  icon: keyof typeof Ionicons.glyphMap;
};

const ITEMS: MenuItem[] = [
  { route: 'Settings', icon: 'settings-outline' },
  { route: 'Help', icon: 'help-circle-outline' },
  { route: 'About', icon: 'information-circle-outline' },
  { route: 'Contact', icon: 'mail-outline' },
];

export function MoreScreen({ navigation }: MoreScreenProps<'More'>) {
  return (
    <ScrollView>
      {ITEMS.map((item) => (
        <Pressable
          key={item.route}
          style={styles.row}
          onPress={() => navigation.navigate(item.route)}
        >
          <Ionicons name={item.icon} size={22} />
          <Text style={styles.label}>{item.route}</Text>
          <Ionicons name="chevron-forward" size={18} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  label: { flex: 1, fontSize: 16 },
});