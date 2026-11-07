import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/search/HomeScreen';
import { SearchResultsScreen } from '@/features/search/SearchResultsScreen';
import type { HomeStackParamList } from './types';

const Home = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Home.Navigator>
      <Home.Screen name="Home" component={HomeScreen} options={{ title: 'Search flights' }} />
      <Home.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({
          title: `${route.params.search.origin} → ${route.params.search.destination}`,
        })}
      />
    </Home.Navigator>
  );
}