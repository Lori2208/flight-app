type SearchFormValues = {
  origin: string | null;
  destination: string | null;
  departureDate: string;
  arrivalDate: string;
};

export function validateSearch(values: SearchFormValues): string | null {
  if (!values.origin) return 'Please choose where you fly from';
  if (!values.destination) return 'Please choose a destination';
  if (values.origin === values.destination) return 'Origin and destination cannot be the same';
  if (values.arrivalDate < values.departureDate) return 'Arrival date cannot be before departure';
  return null;
}
