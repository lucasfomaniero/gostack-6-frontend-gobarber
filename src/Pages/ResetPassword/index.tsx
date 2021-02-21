import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { ToastType } from '../../components/ToastContainer/Toast/styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const { addToast } = useToast();
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    password: Yup.string().required('A senha é obrigatória'),
                    password_confirmation: Yup.string()
                        .required('A confirmação da senha é obrigatória')
                        .oneOf(
                            [Yup.ref('password')],
                            'As senhas digitadas devem ser iguais',
                        ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error('Could not find token. Please try again');
                }

                const { password, password_confirmation } = data;

                await api.post('/password/reset', {
                    password,
                    password_confirmation,
                    token,
                });
                addToast({
                    title: 'Sucesso!',
                    description:
                        'Sua senha foi redefinida. Você já pode fazer login no GoBarber!',
                    type: ToastType.success,
                });
                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getErrorsValidation(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    title: 'Erro ao resetar a senha',
                    description:
                        'Ocorreu um erro ao resetar a senha. Tente novamente.',
                    type: ToastType.error,
                });
            }
        },
        [addToast, history, location.search],
    );

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="GoBarber Logo" />

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <h1>Resetar Senha</h1>

                            <Input
                                type="password"
                                icon={FiLock}
                                name="password"
                                id="password"
                                placeholder="Nova Senha"
                            />
                            <Input
                                type="password"
                                icon={FiLock}
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder="Confirmação da Nova Senha"
                            />
                            <Button type="submit">Alterar Senha</Button>
                        </Form>
                    </AnimationContainer>
                </Content>
            </Container>
        </>
    );
};
export default ResetPassword;
