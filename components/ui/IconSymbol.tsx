// // src/components/ui/IconSymbol.tsx

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { SymbolWeight } from 'expo-symbols';
// import { OpaqueColorValue, type StyleProp, type TextStyle, Platform } from 'react-native';

// type IconMapping = Record<string, keyof typeof MaterialIcons.glyphMap>;

// /**
//  * Map SF Symbols (iOS) → MaterialIcons (Android/web).
//  * Add new mappings here when you use new SF Symbols.
//  */
// const MAPPING: IconMapping = {
//   'house.fill': 'home',
//   'paperplane.fill': 'send',
//   'chevron.left.forwardslash.chevron.right': 'code',
//   'chevron.right': 'chevron-right',

//   // ✅ Added for TaskCard.tsx
//   'clock.fill': 'schedule',
//   'play.fill': 'play-arrow',
//   'checkmark.circle.fill': 'check-circle',
//   'archivebox.fill': 'archive',
//   'trash.fill': 'delete',
// };

// export function IconSymbol({
//   name,
//   size = 24,
//   color,
//   style,
//   weight,
// }: {
//   name: string; // ✅ Allow any string, not just keys of MAPPING
//   size?: number;
//   color: string | OpaqueColorValue;
//   style?: StyleProp<TextStyle>;
//   weight?: SymbolWeight;
// }) {
//   const mappedName = MAPPING[name] || 'help-outline'; // fallback if not in map

//   // ✅ Right now we only render MaterialIcons (cross-platform safe)
//   // If you want native SF Symbols on iOS, you can later import from `expo-symbols`
//   return (
//     <MaterialIcons
//       name={mappedName}
//       size={size}
//       color={color}
//       style={style}
//     />
//   );
// }

















// src/components/ui/IconSymbol.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, keyof typeof MaterialIcons.glyphMap>;

/**
 * Map SF Symbols (iOS) → MaterialIcons (Android/web).
 * Add new mappings here when you use new SF Symbols.
 */
const MAPPING: IconMapping = {
  // General
  // 'house.fill': 'home',
  // 'paperplane.fill': 'send',
  // 'chevron.left.forwardslash.chevron.right': 'code',
  // 'chevron.right': 'chevron-right',
  // 'list.bullet': 'list', // for Total tasks

  // // Task-related
  // 'clock.fill': 'schedule',
  // 'play.fill': 'play-arrow',
  // 'checkmark.circle.fill': 'check-circle',
  // 'checkmark.circle': 'check-circle',
  // 'archivebox.fill': 'archive',
  // 'archivebox': 'archive',
  // 'trash.fill': 'delete',
  // 'trash': 'delete',
  // 'list.bullet.clipboard': 'assignment', // for empty state clipboard

  // // Editing / profile
  // 'pencil': 'edit',
  // 'pencil.fill': 'edit',
  // 'person.crop.circle': 'person', // profile/avatar
  // 'plus': 'add',  
  // 'plus.circle.fill': 'add-circle', // floating add button

    'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'list.bullet': 'list',
  'list.bullet.clipboard': 'assignment',

  // Task-related
  'clock': 'schedule',           // for Pending
  'clock.fill': 'schedule',      // optional iOS variant
  'play': 'play-arrow',          // for In Progress
  'play.fill': 'play-arrow',     // optional iOS variant
  'checkmark': 'check-circle',   // for Completed
  'checkmark.circle': 'check-circle',
  'checkmark.circle.fill': 'check-circle',
  'archivebox': 'archive',       // for Archived
  'archivebox.fill': 'archive',
  'trash': 'delete',
  'trash.fill': 'delete',

  // Editing / profile
  'pencil': 'edit',
  'pencil.fill': 'edit',
  'person.crop.circle': 'person',
  'plus': 'add',
  'plus.circle.fill': 'add-circle',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: string; // Allow any string, not just keys of MAPPING
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name] || 'help-outline'; // fallback if not in map

  return (
    <MaterialIcons
      name={mappedName}
      size={size}
      color={color}
      style={style}
    />
  );
}
