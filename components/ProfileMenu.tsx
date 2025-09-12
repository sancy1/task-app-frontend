
// src/components/ProfileMenu.tsx

import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/src/contexts/AuthContext';

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ visible, onClose }) => {
  const { logout } = useAuth();

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={logout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FF3B30" />
            <ThemedText style={styles.logout}>Logout</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <ThemedText style={styles.closeText}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  logout: { color: '#FF3B30', fontWeight: '600' },
  closeBtn: { marginTop: 8, alignSelf: 'center' },
  closeText: { color: '#007AFF', fontWeight: '600' },
});
