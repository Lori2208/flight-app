import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loggedOut, selectCurrentUser } from '@/features/auth/authSlice';
import { api } from '@/services/api';
import { useAppTheme } from '@/theme/useAppTheme';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { colors } = useAppTheme();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          dispatch(loggedOut());
          dispatch(api.util.resetApiState());
        },
      },
    ]);
  };

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: colors.primary }]}>
            <Text style={[styles.initials, { color: colors.onPrimary }]}>
              {getInitials(user.name)}
            </Text>
          </View>
        )}
        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{user.email}</Text>
      </View>

      {/* Dark mode toggle goes here in the next commit */}

      <Pressable
        style={[styles.logoutButton, { borderColor: colors.danger }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>Log out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 24 },
  header: { alignItems: 'center', gap: 6 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarFallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 32, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  email: { fontSize: 15 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  logoutText: { fontSize: 16, fontWeight: '600' },
});