import React, {useState, useEffect} from "react";

interface registeredUsers {
    username: string;
    email: string;
    role: string;
    password : string;
}

const RegisteredUsers: React.FC = () => {

    const [users, setUsers] = useState<registeredUsers[]>([]);

    useEffect(() => {

        const registeredUsers: registeredUsers[] = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        setUsers(registeredUsers);
    }, 
[]);

    return(
        <div>
            <h2>Usuarios Registrados</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p>Usuario: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RegisteredUsers;