import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../styles/pages/_Profile.scss";
import axios from "axios";
import { set } from "react-hook-form";
interface RegisteredUser {
    username: string;
    password: string;
    role: string;
}

const Profile: React.FC = () => {
    const { role } = useAuthStore();
    const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Cargar usuario autenticado desde localStorage
        const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    const validatePassword = (password: string): boolean => {
        if (password.length < 8) {
            setError("La nueva contraseña debe tener al menos 8 caracteres.");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setError("La nueva contraseña debe contener al menos una letra mayúscula.");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            setError("La nueva contraseña debe contener al menos un número.");
            return false;
        }
        return true;
    };

    const handleChangePasswordSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (newPassword !== confirmNewPassword) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }
        if (!validatePassword(newPassword)) {
            setError("La nueva contraseña no cumple con los requisitos.");
            return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/users/changepassword", {
            "user_id":1,
            "currentPassword": currentPassword,
            "newPassword": newPassword
        }, {    
            headers:{ 
            'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);

        if (response.data.success){
        setSuccessMessage(`Contraseña actualizada exitosamente para el usuario`);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowChangePasswordForm(false);
        }else{
            setError(response.data.message || "No se cambio la contraseña");
        }
    };

    return (
        <div className="profile-layout">
            <Sidebar activePage="profile" />
            <div className="profile-content">
                <header>
                    <h1>Mi Perfil</h1>
                </header>
                <section className="stat-card">
                    <p><strong>Nombre de usuario:</strong> {currentUser?.username }</p> <br />
                    <br /><p><strong>Rol:</strong> {role === "Administrador" ? "Medico" : "Usuario"}</p>
                </section>
                <section className="profile-actions">
                    <button onClick={() => alert("Funcionalidad de editar perfil en desarrollo.")}>
                        Editar Perfil
                    </button>
                    <button onClick={() => alert("Funcionalidad de actualizar correo en desarrollo.")}>
                        Actualizar Correo
                    </button>
                    <button onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}>
                        {showChangePasswordForm ? "Cancelar Cambio de Contraseña" : "Cambiar Contraseña"}
                    </button>
                </section>
                {showChangePasswordForm && (
                    <section className="change-password-form">
    <h2>Cambiar Contraseña</h2>
    <form onSubmit={handleChangePasswordSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
            <label htmlFor="currentPassword">Contraseña Actual:</label>
            <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña:</label>
            <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
            />
        </div>
        <button className="update-button" type="submit">Actualizar Contraseña</button>
    </form>
</section>

                )}
            </div>
        </div>
    );
};

export default Profile;
