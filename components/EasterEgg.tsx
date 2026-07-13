import { Pressable } from 'react-native';

// Wraps a small, deliberately odd detail somewhere in the UI (a typo, a
// mismatched word, a dimmed character) so it's tappable without adding any
// visual affordance that would give away it's interactive — finding it is
// the whole point. Discovery is idempotent; the caller's onFound handles
// dedup against persisted storage.
export default function EasterEgg({
  id,
  onFound,
  children,
}: {
  id: string;
  onFound: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={() => onFound(id)} hitSlop={6}>
      {children}
    </Pressable>
  );
}
