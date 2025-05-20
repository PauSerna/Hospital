import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import '../../styles/pages/_Login.scss';
import axios from "axios";

interface RegisteredUser {
    username: string;
    password: string;
    role: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { login } = useAuthStore();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        const response = await axios.post("http://localhost:3000/auth/login", {
            "email":username,
            "password":password
        });
        console.log(response);
                if (response.status===201){
            navigate("/dashboard");
            localStorage.setItem("token", response.data.token)
        }else{
            setError("Por favor, complete todos los campos");
            return;
        }
    
        /*const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
        const user = registeredUsers.find(
            (user) => user.username === username && user.password === password
        );
    
        if (user) {
            // Guardar el usuario autenticado en localStorage
            localStorage.setItem("currentUser", JSON.stringify(user));
    
            login(user.role); // También actualizamos el rol en el estado global
            navigate("/dashboard");
        } else { 
            setError("Usuario o contraseña incorrectos");
        }*/
    };
    

    return (
        <div className="login-container">
            <img src="/public/img/Logo_Hospital.JPG" alt="Logo" className="login-logo" />
            <form className="login-form">
                <h2 className="login-title">Iniciar Sesion</h2>
                <div className="login-username">
                    <label className="login-label-username" htmlFor="username">Usuario:</label>
                    <input
                        className="login-input-username"
                        title="Usuario"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-password">
                    <label className="login-label-password" htmlFor="password">Contraseña:</label>
                    <input
                        className="login-input-password"
                        title="contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="login-buttom" type="submit" onClick={handleSubmit}>Iniciar sesion</button>
                <footer className="login-footer">
                    <p><b>No tienes cuenta? </b><a href="/register">Registrate</a></p>
                    <p><b>Olvidaste tu contraseña? </b><a href="/reset-password">Recuperar</a></p>

                </footer>
            </form>
        </div>
    );
};

export default Login;