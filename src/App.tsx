import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>testttt</Text>
      </View>
      <StatusBar style="auto" />
    </Provider>
  );
}