import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppDispatch } from '@/app/hooks';
import { useAppTheme } from '@/theme/useAppTheme';
import { useLoginMutation } from './authApi';
import { loggedIn } from './authSlice';

function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'status' in err && err.status === 401) {
    return 'Invalid email or password';
  }
  return 'Could not reach the server. Please try again.';
}

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const { colors } = useAppTheme();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !isLoading;

  const handleLogin = async () => {
    if (!canSubmit) return;
    setError(null);
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(loggedIn(user));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const inputStyle = [
    styles.input,
    { borderColor: colors.border, backgroundColor: colors.inputBackground, color: colors.text },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Ionicons name="airplane" size={56} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Flight App</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Log in to search and save flights
        </Text>
      </View>

      <TextInput
        style={inputStyle}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(null);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
      />

      <TextInput
        style={inputStyle}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(null);
        }}
        secureTextEntry
        autoComplete="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />

      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}

      <Pressable
        style={[
          styles.button,
          { backgroundColor: colors.primary },
          !canSubmit && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Log in</Text>
        )}
      </Pressable>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  header: { alignItems: 'center', gap: 6, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 15 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: { fontSize: 14 },
  button: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 16, fontWeight: '600' },
  hint: { textAlign: 'center', fontSize: 13, marginTop: 8 },
});