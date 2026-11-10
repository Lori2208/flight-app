export type FlightStatus = 'Scheduled' | 'On time' | 'Delayed' | 'Boarding' | 'Cancelled';

export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO string, e.g. "2026-11-20T08:15:00Z"
  arrivalTime: string;
  aircraft: string;
  gate: string;
  terminal: string;
  status: FlightStatus;
  price: number;
}

export interface Airport {
  code: string;
  city: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string; // "YYYY-MM-DD"
  arrivalDate: string;
}

export interface RecentSearch extends SearchParams {
  id: number;
  userId: number;
  createdAt: string;
}

export interface Favorite {
  id: number;
  userId: number;
  flightId: number;
  flight?: Flight;
}
