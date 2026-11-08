import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useResolvedTheme } from '@/theme/useResolvedTheme';

function ThemedApp() {
  const theme = useResolvedTheme();

  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemedApp />
      </SafeAreaProvider>
    </Provider>
  );
}