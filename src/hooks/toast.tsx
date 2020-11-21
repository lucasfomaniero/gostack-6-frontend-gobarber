import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Toast from '../components/ToastContainer';
import { ToastType } from '../components/ToastContainer/Toast/styles';

interface ToastContextData {
    addToast(messages: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    type?: ToastType;
    title: string;
    description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);
    const addToast = useCallback(
        ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
            const id = uuid();
            const toast = {
                id,
                title,
                description,
                type,
            };
            setMessages(oldMessages => [...oldMessages, toast]);
        },
        [],
    );
    const removeToast = useCallback((id: string) => {
        setMessages(state => state.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <Toast messages={messages} />
        </ToastContext.Provider>
    );
};

function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used withing a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };
