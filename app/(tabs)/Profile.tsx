import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileMenuList from '@/components/ProfileMenuList';
import ProfileSupportList from '@/components/ProfileSupportList';
import ProfileActionsList from '@/components/ProfileActionsList';
import { useAuth } from '@/hooks/use-auth';

export default function ProfileScreen() {
    const { userData, isLoading, logout } = useAuth();

    if (isLoading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ProfileHeader userData={userData} />
                <ProfileMenuList isLoggedIn={!!userData} />
                <ProfileSupportList />
                <ProfileActionsList isLoggedIn={!!userData} onLogout={logout} />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200, 
  },
});
