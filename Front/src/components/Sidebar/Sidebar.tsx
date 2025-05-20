import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import '../../styles/components/_Sidebar.scss';

interface SidebarProps {
    activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
    const { role, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="/public/img/Logo_Hospital.JPG" alt="CIIDE Logo" className="sidebar-logo" />
                <h3>Hospital</h3>
            </div>

            <div className="sidebar-menu">
                <div className="menu-section">
                    <h4>Principal</h4>
                    <ul>
                        <li className={activePage === 'dashboard' ? 'active' : ''}
                            onClick={() => handleNavigation('/dashboard')}>
                            <span className="menu-icon">📊</span>
                            Dashboard
                        </li>

                        {role === 'admin' && (
                            <li className={activePage === 'users' ? 'active' : ''}
                                onClick={() => handleNavigation('/registeredUserd')}>
                                <span className="menu-icon">👥</span>
                                Pacientes
                            </li>
                        )}

                        <li className={activePage === 'profile' ? 'active' : ''}
                            onClick={() => handleNavigation("/profile")}>
                            <span className="menu-icon">👤</span>
                            Mi Perfil
                        </li>
                    </ul>
                </div>

                {role === 'admin' && (
                    <div className="menu-section">
                        <h4>Administración</h4>
                        <ul>
                            <li className={activePage === 'settings' ? 'active' : ''}
                                onClick={() => handleNavigation('/settings')}>
                                <span className="menu-icon">⚙️</span>
                                Configuración
                            </li>
                            <li className={activePage === 'reports' ? 'active' : ''}
                                onClick={() => handleNavigation('/reports')}>
                                <span className="menu-icon">📋</span>
                                Reportes
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="sidebar-footer">
                <button className="logout-button" onClick={handleLogout}>
                    <span className="menu-icon">🚪</span>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;