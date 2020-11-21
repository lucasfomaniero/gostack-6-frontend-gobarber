import React, { useEffect } from 'react';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';
import { ToastContent, ToastType } from './styles';

interface ToastProps {
    message: ToastMessage;
    style: Record<string, unknown>;
}

const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,
    info: <FiInfo size={20} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            return clearTimeout(timer);
        };
    });

    return (
        <ToastContent
            style={style}
            color={message.type || ToastType.info}
            hasDescription={!!message.description}
        >
            {icons[message.type || ToastType.success]}
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>
            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </ToastContent>
    );
};

export default Toast;
