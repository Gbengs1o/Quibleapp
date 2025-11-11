import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const ProfileActionsList = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: () => void }) => {
  const iconColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const containerBgColor = useThemeColor({ light: 'rgba(31, 32, 80, 0.08)', dark: 'rgba(31, 32, 80, 0.4)' });
  const separatorColor = useThemeColor({ light: 'rgba(0,0,0,0.1)', dark: 'rgba(255,255,255,0.1)' });

  const menuItems = isLoggedIn ? [
    {
      title: 'Logout',
      icon: <Feather name="log-out" size={24} color={iconColor} />,
      onPress: onLogout,
    },
  ] : [
    {
      title: 'Login',
      icon: <Feather name="log-in" size={24} color={iconColor} />,
      href: '/login' as const,
    },
    {
      title: 'Sign Up',
      icon: <Ionicons name="person-add-outline" size={24} color={iconColor} />,
      href: '/signup' as const,
    },
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor: containerBgColor }]}>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.title}>
            <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
                <Link href={item.href || ''} asChild>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={styles.iconContainer}>{item.icon}</View>
                        <ThemedText style={styles.menuText}>{item.title}</ThemedText>
                        <Feather name="chevron-right" size={24} color={iconColor} />
                    </View>
                </Link>
            </TouchableOpacity>
          {index < menuItems.length - 1 && <View style={[styles.separator, { backgroundColor: separatorColor }]} />}
        </React.Fragment>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  iconContainer: {
    marginRight: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
  },
});

export default ProfileActionsList;
