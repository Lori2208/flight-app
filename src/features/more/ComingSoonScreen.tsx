import { useRoute } from '@react-navigation/native';
import { Placeholder } from '@/components/Placeholder';

export function ComingSoonScreen() {
  const route = useRoute();
  return <Placeholder title={`${route.name}  coming soon`} />;
}
