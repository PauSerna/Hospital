import React, { useState } from "react";
import '../../styles/pages/_Register.scss';
import { usePasswordToggle, useRoleChange, useHandleSubmit } from "../../components/Register";




const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { showPassword } = usePasswordToggle();
    const { role, handleRoleChange } = useRoleChange('');



    const handleSubmit = useHandleSubmit(
        username,
        email,
        role,
        password,
        confirmPassword,
        setError
    );


    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Registro</h2>
                <div className="register-username">
                    <label className="register-label-username" htmlFor="username">Usuario:</label>
                    <input
                        className="register-input-username"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="register-email">
                    <label className="register-label-email" htmlFor="email">Email:</label>
                    <input
                        className="register-input-email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="register-password">
                    <label className="register-label-password" htmlFor="password">Contraseña:</label>
                    <input
                        className="register-input-password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="register-label-password-confirm" htmlFor="password">Confirmar contraseña:</label>
                    <input
                        className="register-input-password-confirm"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="register-role">
                    <label className="register-label-role" htmlFor="role">Role:</label>
                    <div className="register-div-role" >
                        <input
                            id="user"
                            name="role"
                            type="radio"
                            checked={role === 'user'}
                            value={'user'}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="user">Usuario</label>
                        <input
                            id="admin"
                            name="role"
                            type="radio"
                            checked={role === 'admin'}
                            value={'admin'}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="admin">Administrador</label>
                        <input
                            id="medico"
                            name="role"
                            type="radio"
                            checked={role === 'medico'}
                            value={'medico'}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="medico">Medico</label>
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}<br />
                <button className="register-button" onClick={handleSubmit}>Registrar</button>
                <button className="cancel-button" type="button"  onClick={() => window.location.href = "/login"}>Cancelar</button>
            </form>
            <img className="register-img" src="/public/img/Logo_Hospital.JPG" alt="CIIDE" />
        </div>
    );
};

export default Register;