
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export const useAuth = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Failed to load user data from storage', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const login = async (token: string) => {
        try {
            await AsyncStorage.setItem('accessToken', token);
            // Since the login endpoint doesn't return user data, we'll fetch it separately.
            // This is a workaround and assumes the /auth/create endpoint can be used to fetch user data.
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/create`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                setUserData(userData);
            } else {
                console.error('Failed to fetch user data after login');
            }
        } catch (error) {
            console.error('Failed to save user data to storage', error);
        }
    };

    const getAccessToken = async () => {
        try {
            return await AsyncStorage.getItem('accessToken');
        } catch (error) {
            console.error('Failed to get access token from storage', error);
            return null;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('accessToken');
            setUserData(null);
        } catch (error) {
            console.error('Failed to remove user data from storage', error);
        }
    };

    return { userData, isLoading, login, logout };
};
