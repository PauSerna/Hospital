import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";


interface RegisteredUser {
    username: string;
    email: string;
    role: string;
    password: string;
}

export const useHandleSubmit = (
    username: string,
    email: string,
    role: string,
    password: string,
    confirmPassword: string,
    setError: (error: string) => void
) => {
    const navigate = useNavigate();
    const { login } = useAuthStore();;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !role || !password || !confirmPassword) {
            setError('Por favor, complete todos los campos');

        }else if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
        } 
        const response = await axios.post("http://localhost:3000/users/register", { "name":username, "email":email, "role_id": 2, "password":password }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })

        /*const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        registeredUsers.push({ username, email, role, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        alert("Registro exitoso!!");
        setError('');
        login(role);
        console.log('Usuario autenticado:', role);*/
        if (response.status === 201) {
        navigate('/dashboard');
        }

    };
    return handleSubmit;
};


export const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return {
        showPassword,
        handleShowPassword
    };
};

export const useRoleChange = (initialRole: string) => {
    const [role, setRole] = useState<string>(initialRole);

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    return {
        role,
        handleRoleChange
    };
};