import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { LoginScreen } from '@/features/auth/LoginScreen';
import {
  selectIsLoggedIn,
  selectIsRestoring,
  sessionRestored,
} from '@/features/auth/authSlice';
import { loadSession } from '@/features/auth/session';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';
import { useAppTheme } from '@/theme/useAppTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRestoring = useAppSelector(selectIsRestoring);
  const { colors } = useAppTheme();

  useEffect(() => {
    loadSession().then((user) => dispatch(sessionRestored(user)));
  }, [dispatch]);

 if (isRestoring) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}