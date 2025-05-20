import React, {useState} from "react";
import '../../styles/pages/_Login.scss';
import axios, { AxiosError } from "axios";
import { useHandleSubmit } from "../../components/Register";


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            if (!email || !email.includes('@')) {
                setError('Por favor, ingrese un email válido');
                setLoading(false);
                return;
            }

            await axios.post('https://localhost:3000/auth/login', {  
                email: email.trim(),
            });
            
            setSubmitted(true);

        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message){
                setError(error.response.data.message);
            } else {
                setError('Error al enviar el correo. Por favor, inténtelo de nuevo más tarde.'); 
            }
        } finally {
            setLoading(false);
        }
        // Llamada a API {Danilo}
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">¿Olvidaste tu contraseña?</h2>
                <div className="login-username">
                    <label className="login-label-username" htmlFor="username"></label>
                    <input
                        className="login-input-username"
                        title="Usuario" 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
            </form>
            <div className="form-container">
                <h1>¿Olvidaste tu contraseña?</h1>
                {submitted ? (
                    <p className="success-message">
                        Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en tu bandeja de entrada.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            />
                            {error && <p className="error-message">{error}</p>}
                            <button className="submit-button" type="submit" disabled={loading}>
                                {loading ? 'Enviando..' : 'Enviar Correo'}
                            </button>
                    </form>
                )}
                <button className="back-button" onClick={() => window.location.href = "/login"}>
                Volver
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;