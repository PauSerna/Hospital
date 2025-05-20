import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../styles/pages/_Dashboard.scss';

interface DashboardStat {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: number;
        up: boolean;
    };
}
//

const Dashboard: React.FC = () => {
    const { isAuthenticated, role } = useAuthStore();
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStat[]>([]);
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {


        // Simulamos cargar datos
        setLoading(true);
        setTimeout(() => {
            // Datos de ejemplo para estadísticas
            setStats([
                {
                    title: 'Total Pacientes',
                    value: 258,
                    icon: '👥',
                    trend: { value: 12, up: true }
                },
                {
                    title: 'Actividad Mensual',
                    value: '32%',
                    icon: '📊',
                    trend: { value: 5, up: true }
                },
                {
                    title: 'Pacientes Pendientes',
                    value: role === 'admin' ? 42 : 5,
                    icon: '✓',
                    trend: { value: 3, up: false }
                }
            ]);

            // Cargar usuarios registrados
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            setRecentUsers(registeredUsers.slice(-5)); // Obtener últimos 5 usuarios
            setLoading(false);
        }, 800);
    }, [isAuthenticated, navigate, role]);



    return (
        <div className="dashboard-layout">
            <Sidebar activePage="dashboard" />

            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Panel de Control</h1>
                    <div className="user-info">
                        <span className="welcome-text">
                        Bienvenido, {
                        role === 'admin'
                        ? 'Administrador'
                        : role === 'medico'
                        ? 'Médico'
                        : 'Usuario'
                        }
                        </span>
                    </div>
                </header>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Cargando datos...</p>
                    </div>
                ) : (
                    <>
                        <section className="stats-container">
                            {stats.map((stat, index) => (
                                <div className="stat-card" key={index}>
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-info">
                                        <h3>{stat.title}</h3>
                                        <div className="stat-value">{stat.value}</div>
                                        {stat.trend && (
                                            <div className={`stat-trend ${stat.trend.up ? 'up' : 'down'}`}>
                                                {stat.trend.up ? '↑' : '↓'} {stat.trend.value}%
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="dashboard-main">
                            <div className="main-panel">
                                <h2>Actividad Reciente</h2>
                                <div className="panel-content">
                                    <p>No hay actividad reciente para mostrar.</p>
                                </div>
                            </div>

                            {role === 'admin' && (
                                <div className="side-panel">
                                    <h2>Usuarios Recientes</h2>
                                    {recentUsers.length > 0 ? (
                                        <ul className="users-list">
                                            {recentUsers.map((user, index) => (
                                                <li key={index} className="user-item">
                                                    <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                                                    <div className="user-details">
                                                        <span className="user-name">{user.username}</span>
                                                        <span className="user-role">{user.role}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay usuarios registrados.</p>
                                    )}
                                    <button
                                        className="view-all-button"
                                        onClick={() => navigate("/registeredUserd")}
                                    >
                                        Ver todos
                                    </button>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;