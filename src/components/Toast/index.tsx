import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../hooks/toast';
import { Container, ToastContent, ToastType } from './styles';

interface ToastProps {
    messages: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ messages }) => {
    const { removeToast } = useToast();

    return (
        <Container>
            {messages.length > 0 &&
                messages.map(message => {
                    return (
                        <ToastContent
                            key={message.id}
                            color={message.type || ToastType.info}
                            hasDescription={!!message.description}
                        >
                            <FiAlertCircle size={20} />
                            <div>
                                <strong>{message.title}</strong>
                                {message.description && (
                                    <p>{message.description}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeToast(message.id)}
                            >
                                <FiXCircle size={18} />
                            </button>
                        </ToastContent>
                    );
                })}
        </Container>
    );
};

export default Toast;
