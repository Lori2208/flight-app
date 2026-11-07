import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SearchParams } from '@/types';

export type FlightDetailsParams = { flightId: number };


export type HomeStackParamList = {
  Home: undefined;
  SearchResults: { search: SearchParams };
  FlightDetails: FlightDetailsParams;
};

export type FavoritesStackParamList = {
  Favorites: undefined;
  FlightDetails: FlightDetailsParams;
};

export type MoreStackParamList = {
  More: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
  Contact: undefined;
};


export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
  ProfileTab: undefined;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};


export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};


export type HomeScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;
export type FavoritesScreenProps<T extends keyof FavoritesStackParamList> =
  NativeStackScreenProps<FavoritesStackParamList, T>;
export type MoreScreenProps<T extends keyof MoreStackParamList> =
  NativeStackScreenProps<MoreStackParamList, T>;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}