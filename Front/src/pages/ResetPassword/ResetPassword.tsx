import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/pages//_Login.scss';

const ResetPassword: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username || !newPassword) {
            setError("Por favor, complete todos los campos");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                username,
                newPassword
            });

            if (response.status===200) {
                setSuccess("Se envió el correo exitosamente");
                setTimeout(() => navigate("/verify-code"), 2000);
            } else {
                setError(response.data.message || "Error al restablecer la contraseña");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error del servidor");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Recuperar Contraseña</h2>
                <div className="login-username">
                    <label className="login-label-username" htmlFor="username">Usuario:</label>
                    <input
                        className="login-input-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-password">
                    <label className="login-label-password" htmlFor="password">Nueva Contraseña:</label>
                    <input
                        className="login-input-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button className="login-buttom" type="submit">Enviar Correo</button>
            </form>
        </div>
    );
};

export default ResetPassword;
