import {create}  from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    role: string;
    login: (role: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem("userRole"),
    role: localStorage.getItem("userRole") || '',
    login: (role: string) => {
        localStorage.setItem("userRole", role);
        set({ isAuthenticated: true, role });
    },
    logout: () => {
        localStorage.removeItem("userRole");
        set({ isAuthenticated: false, role: '' });
    }
}));