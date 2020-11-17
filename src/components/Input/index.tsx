import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
// eslint-disable-next-line import/no-unresolved
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, error, clearError, registerField } = useField(name);

    const handleOnBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleOnFocus = useCallback(() => setIsFocused(true), []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <>
            <Container
                isErrored={!!error}
                isFilled={isFilled}
                isFocused={isFocused}
            >
                {Icon && <Icon size={20} />}
                <input
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    ref={inputRef}
                    {...rest}
                />
                {error && (
                    <Error title={error}>
                        <FiAlertCircle size={20} color="#c53030" />
                    </Error>
                )}
            </Container>
        </>
    );
};

export default Input;
