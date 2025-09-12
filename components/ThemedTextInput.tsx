
// components/ThemedTextInput.tsx

import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ThemedTextInputProps extends TextInputProps {}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: colors.text,
          backgroundColor: colors.background,
          borderColor: '#ddd', // Using a hardcoded color until 'border' is added to Colors.ts
        },
        style,
      ]}
      placeholderTextColor={'#999'} // Using a hardcoded color until 'placeholder' is added to Colors.ts
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
