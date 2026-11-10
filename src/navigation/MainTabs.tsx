import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesStack, HomeStack, MoreStack } from './stacks';
import type { MainTabParamList } from './types';
import { ProfileScreen } from '@/features/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  HomeTab: 'airplane-outline',
  FavoritesTab: 'heart-outline',
  ProfileTab: 'person-outline',
  MoreTab: 'menu-outline',
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{ title: 'Favorites', headerShown: false }}
      />

      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Tab.Screen
        name="MoreTab"
        component={MoreStack}
        options={{ title: 'More', headerShown: false }}
      />
    </Tab.Navigator>
  );
}
