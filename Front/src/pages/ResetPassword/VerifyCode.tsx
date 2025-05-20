import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pages/_Login.scss';

interface RegisteredUser {
    username: string;
    password: string;
    role: string;
}

const VerifyCode: React.FC = () => {
    const [codeInput, setCodeInput] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const storedCode = localStorage.getItem("verificationCode");
        const username = localStorage.getItem("resetUsername");

        if (codeInput !== storedCode) {
            setError("Código incorrecto");
            return;
        }

        const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const userIndex = registeredUsers.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            localStorage.removeItem("verificationCode");
            localStorage.removeItem("resetUsername");
            setSuccess("Codigo verificado exitosamente. Redirigiendo...");
            setTimeout(() => navigate("/change-password"), 2000);
        } else {
            setError("Usuario no encontrado");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Verifica tu Código</h2>
                <p className="login-text">Se ha enviado un código a tu correo electrónico. Por favor, ingrésalo a continuación.</p>
                <div className="login-username">
                    <label htmlFor="code" className="login-label-username">Código:</label>
                    <input
                        className="login-input-username"
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button className="login-buttom" type="submit">Verificar</button>
            </form>
        </div>
    );
};

export default VerifyCode;
