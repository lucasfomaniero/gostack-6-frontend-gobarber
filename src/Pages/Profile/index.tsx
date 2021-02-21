import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { Container, Content, AvatarInput } from './styles';
import { ToastType } from '../../components/ToastContainer/Toast/styles';

interface ProfileFormData {
    name: string;
    email: string;
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const { user, updateUser } = useAuth();

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .email('Digite um e-mail válido')
                        .required('E-mail obrigatório'),
                    oldPassword: Yup.string(),
                    password: Yup.string().when('oldPassword', {
                        is: val => !!val.length,
                        then: Yup.string().required('Campo obrigatório'),
                        otherwise: Yup.string(),
                    }),

                    passwordConfirmation: Yup.string()
                        .when('oldPassword', {
                            is: val => !!val.length,
                            then: Yup.string().required('Campo obrigatório'),
                            otherwise: Yup.string(),
                        })
                        .oneOf([Yup.ref('password')], 'Confirmação incorreta.'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const {
                    name,
                    email,
                    oldPassword,
                    password,
                    passwordConfirmation,
                } = data;

                const formData = {
                    name,
                    email,
                    ...(oldPassword
                        ? {
                              oldPassword,
                              password,
                              passwordConfirmation,
                          }
                        : {}),
                };

                const response = await api.put('/profile', formData);

                updateUser(response.data);

                history.push('/dashboard');

                addToast({
                    type: ToastType.success,
                    title: 'Perfil atualizado!',
                    description: 'Seu perfil foi atualizado com sucesso!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getErrorsValidation(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: ToastType.error,
                    title: 'Erro na atualização',
                    description:
                        'Ocorreu um erro ao atualizar o perfil, tente novamente.',
                });
            }
        },
        [addToast, updateUser, history],
    );

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const data = new FormData();

                data.append('avatar', e.target.files[0]);
                api.patch('users/avatar', data)
                    .then(response => {
                        updateUser(response.data);

                        addToast({
                            type: ToastType.success,
                            title: 'Perfil atualizado com sucesso!',
                        });
                    })
                    .catch(() => {
                        addToast({
                            type: ToastType.error,
                            title: 'Erro ao atualizar o perfil',
                            description:
                                'Não foi possível atualizar a foto. Tente novamente.',
                        });
                    });
            }
        },
        [addToast, updateUser],
    );

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form
                    ref={formRef}
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }}
                    onSubmit={handleSubmit}
                >
                    <AvatarInput>
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} />
                        ) : (
                            <FiUser />
                        )}
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input
                                type="file"
                                id="avatar"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input
                        defaultValue={user.name}
                        name="name"
                        icon={FiUser}
                        placeholder="Nome"
                    />
                    <Input
                        defaultValue={user.email}
                        name="email"
                        icon={FiMail}
                        placeholder="E-mail"
                    />

                    <Input
                        containerStyle={{ marginTop: 24 }}
                        name="oldPassword"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha atual"
                    />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Nova senha"
                    />

                    <Input
                        name="passwordConfirmation"
                        icon={FiLock}
                        type="password"
                        placeholder="Confirmar senha"
                    />

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;
