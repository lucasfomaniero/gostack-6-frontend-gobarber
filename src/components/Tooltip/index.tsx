import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Container } from './styles';

interface TooltipProps {
    title: string;
    className?: string;
}
const Tooltip: React.FC<TooltipProps> = ({
    title,
    className = '',
    children,
}) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    );
};

export default Tooltip;