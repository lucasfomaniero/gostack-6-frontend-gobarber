import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}
interface AuthContextData {
    user: User;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

interface UserData {
    user: User;
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<UserData>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (user && token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { user: JSON.parse(user), token };
        }
        return {} as UserData;
    });

    const signIn = useCallback(async (email, password) => {
        const response = await api.post<UserData>('/sessions', {
            email,
            password,
        });
        const { user, token } = response.data;

        if (user && token) {
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));
            localStorage.setItem('@GoBarber:token', token);
            setData({ user, token });
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');
        setData({} as UserData);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));
            setData({ token: data.token, user });
        },
        [setData, data.token],
    );

    return (
        <>
            <AuthContext.Provider
                value={{
                    user: data.user,
                    signIn,
                    signOut,
                    updateUser,
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an Provider.');
    }

    return context;
}

export { AuthProvider, useAuth };
