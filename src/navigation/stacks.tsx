import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/search/HomeScreen';
import { SearchResultsScreen } from '@/features/search/SearchResultsScreen';
import { FavoritesScreen } from '@/features/favorites/FavoritesScreen';
import type { FavoritesStackParamList, HomeStackParamList, MoreStackParamList } from './types';
import { FlightDetailsScreen } from '@/features/flights/FlightDetailsScreen';
import { MoreScreen } from '@/features/more/MoreScreen';
import { ComingSoonScreen } from '@/features/more/ComingSoonScreen';

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
      <Home.Screen
        name="FlightDetails"
        component={FlightDetailsScreen}
        options={{ title: 'Flight details' }}
      />
    </Home.Navigator>
  );
}

const Favorites = createNativeStackNavigator<FavoritesStackParamList>();

export function FavoritesStack() {
  return (
    <Favorites.Navigator>
      <Favorites.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorite flights' }}
      />
      <Favorites.Screen
        name="FlightDetails"
        component={FlightDetailsScreen}
        options={{ title: 'Flight details' }}
      />
    </Favorites.Navigator>
  );
}

const More = createNativeStackNavigator<MoreStackParamList>();

export function MoreStack() {
  return (
    <More.Navigator>
      <More.Screen name="More" component={MoreScreen} />
      <More.Screen name="Settings" component={ComingSoonScreen} />
      <More.Screen name="Help" component={ComingSoonScreen} />
      <More.Screen name="About" component={ComingSoonScreen} />
      <More.Screen name="Contact" component={ComingSoonScreen} />
    </More.Navigator>
  );
}
